import { Check, ArrowRight } from 'lucide-react'
import { SPECIALIZATIONS } from '../../constants'
import type { CandidateProfile } from '../../types'

interface Props {
  onNext: () => void
  onBack: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

export function Specialization({ onNext, onBack, profile, setProfile }: Props) {
  const selected = profile.specialization

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-primary tracking-tight">What field do you work in?</h2>
        <p className="text-muted">Choose your specialization to personalize your Tamayoz profile.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {SPECIALIZATIONS.map(spec => {
          const isSelected = selected === spec.id
          return (
            <button
              key={spec.id}
              onClick={() => setProfile(p => ({ ...p, specialization: spec.id }))}
              className={`relative card text-left flex flex-col p-7 transition-all duration-200 ${
                isSelected
                  ? 'border-primary border-2 bg-primary/5 scale-[1.02]'
                  : 'card-hover hover:border-gray-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check size={13} color="white" strokeWidth={3} />
                </div>
              )}
              <div
                className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 text-2xl transition-all"
                style={{
                  width: 52, height: 52,
                  background: isSelected ? '#252C37' : '#F2F4F7',
                }}
              >
                {spec.icon}
              </div>
              <h3 className={`font-bold text-sm mb-1.5 ${isSelected ? 'text-primary' : 'text-primary'}`}>
                {spec.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">{spec.desc}</p>
              <p className="text-xs text-muted/60 mt-1">{spec.titleAr}</p>
            </button>
          )
        })}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button onClick={onBack} className="btn-outline">← Back</button>
        <button
          disabled={!selected}
          onClick={onNext}
          className="btn-primary"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
