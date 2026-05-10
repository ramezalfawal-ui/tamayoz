// ─── App Views ───────────────────────────────────────────
export type AppView = 'landing' | 'wizard' | 'dashboard' | 'training' | 'companies'

// ─── Profile ─────────────────────────────────────────────
export interface CandidateProfile {
  // Registration
  email: string
  password?: string

  // Personal
  name: string
  phone: string
  city: string
  country: string
  nationality: string
  linkedin?: string
  website?: string
  availability: string
  noticeperiod?: string

  // Professional
  specialization: string
  currentTitle?: string
  yearsExp?: string
  salaryMin?: number
  salaryMax?: number

  // Content
  coverLetter: string
  skills: string[]
  languages: Language[]
  education: Education[]
  experience: WorkExperience[]

  // Files
  cvFileName?: string
  cvUrl?: string
  videoFileName?: string
  videoUrl?: string

  // Scores
  completion: number
  overallScore?: number
  scores?: ScoreResult[]
  aiResult?: AIEvaluation
}

export interface Language {
  name: string
  level: 'Native' | 'Fluent' | 'Intermediate' | 'Basic'
}

export interface Education {
  id: string
  degree: string
  institution: string
  yearFrom: string
  yearTo: string
}

export interface WorkExperience {
  id: string
  title: string
  company: string
  yearFrom: string
  yearTo: string
  current: boolean
  description: string
}

// ─── AI Evaluation ───────────────────────────────────────
export interface ScoreResult {
  title: string
  score: number
  label: 'Strong' | 'Good' | 'Needs work'
  tips: string[]
}

export interface AIEvaluation {
  overall: number
  scores: ScoreResult[]
  criticalActions: string[]
  readinessLevel: 'Top Talent' | 'Job Ready' | 'Growing' | 'Needs Development'
  topStrength: string
  developmentTip: string
}

// ─── Specialization ──────────────────────────────────────
export interface Specialization {
  id: string
  title: string
  titleAr: string
  desc: string
  icon: string
  color: string
  questions: InterviewQuestion[]
  testTitle: string
}

export interface InterviewQuestion {
  id: string
  question: string
}

// ─── Company ─────────────────────────────────────────────
export interface Company {
  id: string
  name: string
  location: string
  size: string
  field: string
  roles: string[]
  logo?: string
  verified: boolean
}

// ─── Training ────────────────────────────────────────────
export interface TrainingItem {
  id: string
  title: string
  type: 'Online course' | 'Live workshop' | 'Community' | 'Mentorship'
  field: string
  provider: string
  duration: string
  emoji: string
  color: string
}

// ─── Wizard Step ─────────────────────────────────────────
export interface WizardStepProps {
  onNext: () => void
  onBack: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}
