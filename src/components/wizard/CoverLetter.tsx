// CoverLetter.tsx
import { useState, useEffect } from 'react'
import { Lightbulb, ArrowRight } from 'lucide-react'
import { SPECIALIZATIONS } from '../../constants'
import { generateCoverLetterTips } from '../../lib/ai'
import type { CandidateProfile } from '../../types'

interface Props {
  onNext: () => void
  onBack: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

export function CoverLetter({ onNext, onBack, profile, setProfile }: Props) {
  const [tips, setTips] = useState<string[]>([
    'Introduce yourself and your professional background.',
    'Highlight 2–3 relevant projects or achievements.',
    'Mention the tools and software you\'re expert in.',
    'Explain the kind of team or role you\'re looking for.',
    'Mention UAE market experience if you have any.',
  ])
  const [loadingTips, setLoadingTips] = useState(false)
  const words = profile.coverLetter?.trim().split(/\s+/).filter(Boolean).length ?? 0
  const specTitle = SPECIALIZATIONS.find(s => s.id === profile.specialization)?.title || 'your field'

  useEffect(() => {
    if (!profile.specialization) return
    setLoadingTips(true)
    generateCoverLetterTips(specTitle)
      .then(setTips)
      .catch(() => {}) // keep defaults on error
      .finally(() => setLoadingTips(false))
  }, [profile.specialization])

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-5">
        <div className="card p-7 space-y-4">
          <div>
            <h2 className="text-2xl font-black text-primary tracking-tight">Tell your story</h2>
            <p className="text-sm text-muted mt-1">Write one cover letter for your specialization. Companies read this first.</p>
          </div>
          <textarea
            className="input-field min-h-[260px] leading-relaxed resize-y"
            placeholder={`Start with a brief introduction about your background in ${specTitle}. Highlight 2–3 key achievements, the tools you use, and what kind of role you're looking for in the UAE market...`}
            value={profile.coverLetter}
            onChange={e => setProfile(p => ({ ...p, coverLetter: e.target.value }))}
          />
          <div className={`text-right text-xs font-bold tracking-widest uppercase ${words > 400 ? 'text-red-500' : 'text-muted'}`}>
            {words} / 400 words
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={onBack} className="btn-outline">← Back</button>
          <button onClick={onNext} className="btn-primary">Save & Continue <ArrowRight size={16} /></button>
        </div>
      </div>

      <div className="card bg-primary border-none p-6 space-y-4 self-start">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <Lightbulb size={16} className="text-accent" />
          </div>
          <span className="font-bold text-white text-sm">
            {loadingTips ? 'Loading AI tips...' : 'Helpful prompts'}
          </span>
        </div>
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-2.5 text-xs text-white/75 leading-relaxed">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            {tip}
          </div>
        ))}
      </div>
    </div>
  )
}
