import { useState, useEffect } from 'react'
import { Landing }        from './components/Landing'
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
import { useAuth }       from './hooks/useAuth'
import { useCandidate }  from './hooks/useCandidate'
import type { AppView, CandidateProfile, AIEvaluation as AIResult } from './types'

const DEFAULT_PROFILE: CandidateProfile = {
  email: '', name: '', phone: '', city: 'Dubai', country: 'AE',
  nationality: '', availability: 'Immediately', specialization: '',
  coverLetter: '', skills: [], languages: [], education: [], experience: [],
  completion: 15,
}

export default function App() {
  const { user, profile, loading: authLoading, isLoggedIn, register, logout } = useAuth()
  const { candidate, save: saveCandidate, saveSkills, saveAIScore } = useCandidate(user?.id)

  const [view,         setView]    = useState<AppView>('landing')
  const [step,         setStep]    = useState(0)
  const [localProfile, setProfile] = useState<CandidateProfile>(DEFAULT_PROFILE)

  useEffect(() => {
    if (!authLoading && isLoggedIn && view === 'landing') setView('dashboard')
  }, [authLoading, isLoggedIn, view])

  useEffect(() => {
    if (candidate && profile) {
      setProfile(p => ({
        ...p,
        name:           profile.full_name ?? p.name,
        email:          user?.email ?? p.email,
        city:           candidate.location ?? p.city,
        specialization: candidate.field ?? p.specialization,
        coverLetter:    candidate.cover_letter ?? p.coverLetter,
      }))
    }
  }, [candidate, profile, user])

  const next = () => {
    setStep(s => s + 1)
    setProfile(p => ({ ...p, completion: Math.min(p.completion + 13, 100) }))
  }
  const back = () => { if (step === 0) setView('landing'); else setStep(s => Math.max(s - 1, 0)) }

  const handleAIFinish = async (result: AIResult) => {
    setProfile(p => ({ ...p, aiResult: result, overallScore: result.overall }))
    if (isLoggedIn) {
      try {
        await saveAIScore(result as unknown as Record<string, unknown>)
        await saveCandidate({ cover_letter: localProfile.coverLetter || undefined, field: localProfile.specialization || undefined })
        await saveSkills(localProfile.skills)
      } catch (e) { console.error('Save error:', e) }
    }
    setView('dashboard')
  }

  const navigate = (v: AppView) => { if (v === 'wizard') setStep(0); setView(v) }

  if (authLoading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F7F8FA' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:48, height:48, border:'4px solid #F2F4F7', borderTopColor:'#252C37', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 1rem' }} />
        <div style={{ fontSize:14, color:'#6B7280', fontFamily:'system-ui,sans-serif' }}>Loading Tamayoz...</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (view === 'landing')   return <Landing    onNavigate={navigate} />
  if (view === 'dashboard') return <Dashboard  profile={localProfile} onNavigate={navigate} onLogout={logout} />
  if (view === 'training')  return <Training   onNavigate={navigate} />
  if (view === 'companies') return <Companies  onNavigate={navigate} />

  const stepProps = { profile: localProfile, setProfile, onNext: next, onBack: back }

  return (
    <WizardLayout currentStep={step}>
      {step === 0 && <Registration {...stepProps} />}
      {step === 1 && <Specialization {...stepProps} />}
      {step === 2 && <ProfileBasics  {...stepProps} />}
      {step === 3 && <ProfileDetails {...stepProps} />}
      {step === 4 && <CoverLetter    {...stepProps} />}
      {step === 5 && <VideoUpload    {...stepProps} />}
      {step === 6 && <AIEvaluation profile={localProfile} onFinish={handleAIFinish} onBack={back} />}
    </WizardLayout>
  )
}
