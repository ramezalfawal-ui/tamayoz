import { useState } from 'react'
import { WizardLayout }   from './components/WizardLayout'
import { Registration }   from './components/wizard/Registration'
import { Specialization } from './components/wizard/Specialization'
import { ProfileBasics }  from './components/wizard/ProfileBasics'
import { ProfileDetails } from './components/wizard/ProfileDetails'
import { CoverLetter }    from './components/wizard/CoverLetter'
import { VideoUpload }    from './components/wizard/VideoUpload'
import { AIEvaluation }  from './components/wizard/AIEvaluation'
import { Dashboard }     from './components/Dashboard'
import { Training }      from './components/Training'
import { Companies }     from './components/Companies'
import type { AppView, CandidateProfile, AIEvaluation as AIResult } from './types'

const DEFAULT_PROFILE: CandidateProfile = {
  email: '',
  name: '',
  phone: '',
  city: 'Dubai',
  country: 'AE',
  nationality: '',
  availability: 'Immediately',
  specialization: '',
  coverLetter: '',
  skills: [],
  languages: [],
  education: [],
  experience: [],
  completion: 15,
}

const COMPLETION_PER_STEP = 13

export default function App() {
  const [view,    setView]    = useState<AppView>('wizard')
  const [step,    setStep]    = useState(0)
  const [profile, setProfile] = useState<CandidateProfile>(DEFAULT_PROFILE)

  const next = () => {
    setStep(s => s + 1)
    setProfile(p => ({ ...p, completion: Math.min(p.completion + COMPLETION_PER_STEP, 100) }))
  }
  const back = () => setStep(s => Math.max(s - 1, 0))

  const handleAIFinish = (result: AIResult) => {
    setProfile(p => ({ ...p, aiResult: result, overallScore: result.overall }))
    setView('dashboard')
  }

  const navigate = (v: AppView) => setView(v)

  // Post-wizard views
  if (view === 'dashboard') return <Dashboard profile={profile} onNavigate={navigate} />
  if (view === 'training')  return <Training  onNavigate={navigate} />
  if (view === 'companies') return <Companies onNavigate={navigate} />

  // Wizard
  const stepProps = { profile, setProfile, onNext: next, onBack: back }

  return (
    <WizardLayout currentStep={step}>
      {step === 0 && <Registration {...stepProps} />}
      {step === 1 && <Specialization {...stepProps} />}
      {step === 2 && <ProfileBasics  {...stepProps} />}
      {step === 3 && <ProfileDetails {...stepProps} />}
      {step === 4 && <CoverLetter    {...stepProps} />}
      {step === 5 && <VideoUpload    {...stepProps} />}
      {step === 6 && (
        <AIEvaluation
          profile={profile}
          onFinish={handleAIFinish}
          onBack={back}
        />
      )}
    </WizardLayout>
  )
}
