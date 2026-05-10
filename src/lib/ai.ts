import type { CandidateProfile, AIEvaluation } from '../types'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

export async function evaluateProfile(profile: CandidateProfile): Promise<AIEvaluation> {
  const specTitle = profile.specialization || 'General'
  
  const prompt = `You are Tamayoz AI, a talent assessment system for the UAE/GCC job market.
Evaluate this candidate and return ONLY valid JSON — no markdown, no backticks, no explanation.

Candidate Information:
- Name: ${profile.name || 'Candidate'}
- Specialization: ${specTitle}
- City: ${profile.city || 'UAE'}
- Years of Experience: ${profile.yearsExp || 'Not specified'}
- Skills: ${profile.skills?.join(', ') || 'Not specified'}
- Cover Letter: ${profile.coverLetter || 'Not provided'}
- CV uploaded: ${profile.cvFileName ? 'Yes' : 'No'}
- Video uploaded: ${profile.videoFileName ? 'Yes' : 'No'}

Return this exact JSON structure:
{
  "overall": <integer 55-92>,
  "scores": [
    {"title": "Profile completeness", "score": <1.0-10.0>, "label": "Strong", "tips": ["<specific tip>", "<specific tip>"]},
    {"title": "CV quality", "score": <1.0-10.0>, "label": "Good", "tips": ["<specific tip>", "<specific tip>"]},
    {"title": "Cover letter", "score": <1.0-10.0>, "label": "Good", "tips": ["<specific tip>", "<specific tip>"]},
    {"title": "Interview readiness", "score": <1.0-10.0>, "label": "Good", "tips": ["<specific tip>", "<specific tip>"]},
    {"title": "UAE market fit", "score": <1.0-10.0>, "label": "Good", "tips": ["<specific tip>", "<specific tip>"]},
    {"title": "Communication clarity", "score": <1.0-10.0>, "label": "Good", "tips": ["<specific tip>", "<specific tip>"]}
  ],
  "criticalActions": ["<action1>", "<action2>", "<action3>"],
  "readinessLevel": "Job Ready",
  "topStrength": "<one sentence about their main strength based on their profile>",
  "developmentTip": "<one actionable sentence for the most impactful improvement>"
}

Rules:
- Labels must be exactly: "Strong", "Good", or "Needs work"
- Overall score 55–92 (realistic, not all high)
- Make tips SPECIFIC to their specialization (${specTitle}) and UAE market
- readinessLevel must be one of: "Top Talent", "Job Ready", "Growing", "Needs Development"
- If cover letter is empty, score it lower and tip them to write one
- If no CV, lower profile completeness score`

  const response = await fetch('/api/claude/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  const text = data.content
    .map((b: { type: string; text?: string }) => b.text || '')
    .join('')
    .trim()

  // Strip any accidental markdown fences
  const clean = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  return JSON.parse(clean) as AIEvaluation
}

export async function generateCoverLetterTips(specialization: string): Promise<string[]> {
  const prompt = `Give 5 short, specific tips for writing a strong cover letter for a ${specialization} role in the UAE market.
Return ONLY a JSON array of 5 strings. No markdown, no explanation.
Example: ["Tip one.", "Tip two.", ...]`

  const response = await fetch('/api/claude/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()
  const text = data.content.map((b: { text?: string }) => b.text || '').join('').trim()
  const clean = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  return JSON.parse(clean) as string[]
}
