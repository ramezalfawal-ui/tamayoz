import { supabase } from './supabase'
import type { CandidateInsert, SkillInsert, EducationInsert, ExperienceInsert } from './database.types'

// ══════════════════════════════════════════════════════
// CANDIDATE OPERATIONS
// ══════════════════════════════════════════════════════

export async function getOrCreateCandidate(userId: string) {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code === 'PGRST116') {
    // Not found — create
    const { data: newCandidate, error: createError } = await supabase
      .from('candidates')
      .insert({ user_id: userId })
      .select()
      .single()
    if (createError) throw createError
    return newCandidate
  }
  if (error) throw error
  return data
}

export async function updateCandidate(candidateId: string, updates: Partial<CandidateInsert>) {
  const { data, error } = await supabase
    .from('candidates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', candidateId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getFullProfile(userId: string) {
  const { data, error } = await supabase
    .rpc('get_candidate_profile', { p_user_id: userId })
  if (error) throw error
  return data
}

// ── Skills ────────────────────────────────────────────────
export async function upsertSkills(candidateId: string, skills: string[]) {
  await supabase.from('candidate_skills').delete().eq('candidate_id', candidateId)
  if (!skills.length) return
  const rows: SkillInsert[] = skills.map(s => ({
    candidate_id: candidateId,
    skill_name:   s,
    skill_type:   'technical',
    skill_level:  'intermediate',
  }))
  const { error } = await supabase.from('candidate_skills').insert(rows)
  if (error) throw error
}

export async function getSkills(candidateId: string) {
  const { data, error } = await supabase
    .from('candidate_skills')
    .select('*')
    .eq('candidate_id', candidateId)
  if (error) throw error
  return data ?? []
}

// ── Education ─────────────────────────────────────────────
export async function upsertEducation(candidateId: string, items: Omit<EducationInsert, 'candidate_id'>[]) {
  await supabase.from('candidate_education').delete().eq('candidate_id', candidateId)
  if (!items.length) return
  const rows = items.map(i => ({ ...i, candidate_id: candidateId }))
  const { error } = await supabase.from('candidate_education').insert(rows)
  if (error) throw error
}

// ── Experience ────────────────────────────────────────────
export async function upsertExperience(candidateId: string, items: Omit<ExperienceInsert, 'candidate_id'>[]) {
  await supabase.from('candidate_experience').delete().eq('candidate_id', candidateId)
  if (!items.length) return
  const rows = items.map(i => ({ ...i, candidate_id: candidateId }))
  const { error } = await supabase.from('candidate_experience').insert(rows)
  if (error) throw error
}

// ── CV ────────────────────────────────────────────────────
export async function saveCV(candidateId: string, fileUrl: string, fileName: string, parsedJson?: Record<string, unknown>) {
  await supabase.from('candidate_cv').delete().eq('candidate_id', candidateId)
  const { data, error } = await supabase
    .from('candidate_cv')
    .insert({ candidate_id: candidateId, file_url: fileUrl, file_name: fileName, parsed_json: parsedJson ?? null })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Upload CV file ────────────────────────────────────────
export async function uploadCVFile(userId: string, file: File) {
  const ext  = file.name.split('.').pop()
  const path = `${userId}/cv.${ext}`
  const { error } = await supabase.storage
    .from('candidate-cvs')
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('candidate-cvs')
    .getPublicUrl(path)
  return publicUrl
}

// ── Scores ────────────────────────────────────────────────
export async function upsertScores(candidateId: string, scores: Record<string, number>, aiResult?: Record<string, unknown>) {
  const { error } = await supabase
    .from('candidate_scores')
    .upsert({
      candidate_id:             candidateId,
      profile_completion_score: scores.completion  ?? 0,
      cv_quality_score:         scores.cv          ?? 0,
      interview_score:          scores.interview   ?? 0,
      communication_score:      scores.communication ?? 0,
      practical_test_score:     scores.practical   ?? 0,
      hiring_readiness_score:   scores.readiness   ?? 0,
      overall_score:            scores.overall     ?? 0,
      ai_result:                aiResult ?? null,
      updated_at:               new Date().toISOString(),
    })
  if (error) throw error
}

export async function getScores(candidateId: string) {
  const { data, error } = await supabase
    .from('candidate_scores')
    .select('*')
    .eq('candidate_id', candidateId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ── Cover letter ─────────────────────────────────────────
export async function saveCoverLetter(candidateId: string, text: string) {
  return updateCandidate(candidateId, { cover_letter: text })
}

// ══════════════════════════════════════════════════════
// COMPANY OPERATIONS
// ══════════════════════════════════════════════════════

export async function createCompany(userId: string, data: Record<string, string>) {
  const { data: company, error } = await supabase
    .from('companies')
    .insert({ user_id: userId, ...data })
    .select()
    .single()
  if (error) throw error
  return company
}

export async function getCompany(userId: string) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ── Candidate search (for verified companies) ─────────────
export async function searchCandidates(filters: {
  field?: string
  location?: string
  minScore?: number
  maxSalary?: number
  availability?: string
}) {
  let query = supabase
    .from('candidates')
    .select(`
      id, field, current_title, location, experience_years,
      expected_salary_min, expected_salary_max, availability,
      candidate_scores(hiring_readiness_score, interview_score, overall_score),
      candidate_skills(skill_name)
    `)
    .eq('profile_status', 'active')
    .eq('show_to_companies', true)

  if (filters.field)        query = query.eq('field', filters.field)
  if (filters.location)     query = query.ilike('location', `%${filters.location}%`)
  if (filters.availability) query = query.eq('availability', filters.availability)
  if (filters.maxSalary)    query = query.lte('expected_salary_min', filters.maxSalary)

  const { data, error } = await query.limit(50)
  if (error) throw error
  return data ?? []
}

// ══════════════════════════════════════════════════════
// CONTACT REQUESTS
// ══════════════════════════════════════════════════════

export async function sendContactRequest(companyId: string, candidateId: string, message: string, jobTitle: string) {
  const { data, error } = await supabase
    .from('contact_requests')
    .insert({ company_id: companyId, candidate_id: candidateId, message, job_title: jobTitle })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getContactRequests(candidateId: string) {
  const { data, error } = await supabase
    .from('contact_requests')
    .select('*, companies(company_name, industry, location)')
    .eq('candidate_id', candidateId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function respondToContactRequest(requestId: string, status: 'accepted' | 'rejected') {
  const { error } = await supabase
    .from('contact_requests')
    .update({ status, responded_at: new Date().toISOString() })
    .eq('id', requestId)
  if (error) throw error
}
