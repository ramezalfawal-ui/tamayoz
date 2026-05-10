// Auto-generated Supabase database types for Tamayoz
// Re-run `npx supabase gen types typescript` after schema changes

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row:    ProfileRow
        Insert: ProfileInsert
        Update: Partial<ProfileInsert>
      }
      candidates: {
        Row:    CandidateRow
        Insert: CandidateInsert
        Update: Partial<CandidateInsert>
      }
      candidate_cv: {
        Row:    CandidateCVRow
        Insert: CandidateCVInsert
        Update: Partial<CandidateCVInsert>
      }
      candidate_skills: {
        Row:    SkillRow
        Insert: SkillInsert
        Update: Partial<SkillInsert>
      }
      candidate_education: {
        Row:    EducationRow
        Insert: EducationInsert
        Update: Partial<EducationInsert>
      }
      candidate_experience: {
        Row:    ExperienceRow
        Insert: ExperienceInsert
        Update: Partial<ExperienceInsert>
      }
      candidate_scores: {
        Row:    ScoresRow
        Insert: ScoresInsert
        Update: Partial<ScoresInsert>
      }
      candidate_interview: {
        Row:    InterviewRow
        Insert: InterviewInsert
        Update: Partial<InterviewInsert>
      }
      companies: {
        Row:    CompanyRow
        Insert: CompanyInsert
        Update: Partial<CompanyInsert>
      }
      contact_requests: {
        Row:    ContactRequestRow
        Insert: ContactRequestInsert
        Update: Partial<ContactRequestInsert>
      }
      shortlist_requests: {
        Row:    ShortlistRequestRow
        Insert: ShortlistRequestInsert
        Update: Partial<ShortlistRequestInsert>
      }
    }
    Functions: {
      get_candidate_profile:   { Args: { p_user_id: string }; Returns: Record<string, unknown> }
      calculate_completion:    { Args: { p_candidate_id: string }; Returns: number }
    }
  }
}

// ── Row types ─────────────────────────────────────────────
export interface ProfileRow {
  id:         string
  full_name:  string | null
  phone:      string | null
  role:       'candidate' | 'company' | 'admin'
  avatar_url: string | null
  created_at: string
  updated_at: string
}
export type ProfileInsert = Omit<ProfileRow, 'created_at' | 'updated_at'>

export interface CandidateRow {
  id:                  string
  user_id:             string
  field:               string | null
  current_title:       string | null
  target_title:        string | null
  location:            string | null
  nationality:         string | null
  visa_status:         string | null
  experience_years:    number
  expected_salary_min: number | null
  expected_salary_max: number | null
  notice_period:       string | null
  availability:        string
  work_type:           string
  linkedin_url:        string | null
  portfolio_url:       string | null
  cover_letter:        string | null
  confidential_mode:   boolean
  show_to_companies:   boolean
  profile_status:      'draft' | 'active' | 'hidden'
  created_at:          string
  updated_at:          string
}
export type CandidateInsert = Omit<CandidateRow, 'id' | 'created_at' | 'updated_at'>

export interface CandidateCVRow {
  id:                string
  candidate_id:      string
  file_url:          string | null
  file_name:         string | null
  file_type:         string | null
  extracted_text:    string | null
  parsed_json:       Record<string, unknown> | null
  cv_quality_notes:  Record<string, unknown> | null
  created_at:        string
}
export type CandidateCVInsert = Omit<CandidateCVRow, 'id' | 'created_at'>

export interface SkillRow {
  id:           string
  candidate_id: string
  skill_name:   string
  skill_type:   'technical' | 'soft' | 'tool' | 'language'
  skill_level:  string
}
export type SkillInsert = Omit<SkillRow, 'id'>

export interface EducationRow {
  id:           string
  candidate_id: string
  degree:       string
  institution:  string
  year_from:    string | null
  year_to:      string | null
  created_at:   string
}
export type EducationInsert = Omit<EducationRow, 'id' | 'created_at'>

export interface ExperienceRow {
  id:               string
  candidate_id:     string
  company_name:     string
  job_title:        string
  start_date:       string | null
  end_date:         string | null
  is_current:       boolean
  responsibilities: string[]
  achievements:     string[]
  industry:         string | null
  created_at:       string
}
export type ExperienceInsert = Omit<ExperienceRow, 'id' | 'created_at'>

export interface ScoresRow {
  candidate_id:             string
  profile_completion_score: number
  cv_quality_score:         number
  interview_score:          number
  communication_score:      number
  practical_test_score:     number
  portfolio_score:          number
  hiring_readiness_score:   number
  overall_score:            number
  ai_result:                Record<string, unknown> | null
  score_explanation:        Record<string, unknown> | null
  updated_at:               string
}
export type ScoresInsert = Omit<ScoresRow, 'updated_at'>

export interface InterviewRow {
  id:                  string
  candidate_id:        string
  field:               string | null
  questions:           Record<string, unknown>[]
  answers:             Record<string, unknown>[]
  video_url:           string | null
  video_file_name:     string | null
  interview_score:     number | null
  communication_score: number | null
  ai_feedback:         Record<string, unknown> | null
  created_at:          string
  updated_at:          string
}
export type InterviewInsert = Omit<InterviewRow, 'id' | 'created_at' | 'updated_at'>

export interface CompanyRow {
  id:                   string
  user_id:              string
  company_name:         string
  industry:             string | null
  trade_license_number: string | null
  trade_license_url:    string | null
  website:              string | null
  location:             string | null
  contact_person:       string | null
  contact_phone:        string | null
  employee_count:       string | null
  hiring_needs:         string | null
  status:               'pending' | 'verified' | 'rejected' | 'suspended'
  admin_notes:          string | null
  verified_at:          string | null
  created_at:           string
  updated_at:           string
}
export type CompanyInsert = Omit<CompanyRow, 'id' | 'created_at' | 'updated_at'>

export interface ContactRequestRow {
  id:           string
  company_id:   string
  candidate_id: string
  job_title:    string | null
  message:      string | null
  salary_range: string | null
  work_type:    string | null
  status:       'pending' | 'accepted' | 'rejected'
  responded_at: string | null
  created_at:   string
  updated_at:   string
}
export type ContactRequestInsert = Omit<ContactRequestRow, 'id' | 'created_at' | 'updated_at'>

export interface ShortlistRequestRow {
  id:                      string
  company_id:              string
  job_title:               string
  job_description:         string | null
  required_skills:         string[]
  experience_level:        string | null
  salary_range:            string | null
  location:                string | null
  work_type:               string | null
  number_of_candidates:    number
  urgency:                 string
  shortlisted_candidates:  string[]
  status:                  'pending' | 'in_progress' | 'completed'
  price:                   number | null
  admin_notes:             string | null
  created_at:              string
  updated_at:              string
}
export type ShortlistRequestInsert = Omit<ShortlistRequestRow, 'id' | 'created_at' | 'updated_at'>
