import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import type { CandidateProfile } from '../../types'

interface Props {
  onNext: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

export function Registration({ onNext, profile, setProfile }: Props) {
  const [showPass, setShowPass] = useState(false)
  const [consents, setConsents] = useState({ terms: false, privacy: false, video: false })
  const allConsented = Object.values(consents).every(Boolean) && profile.email

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 rounded-4xl overflow-hidden shadow-2xl bg-white">
      {/* Left — navy */}
      <div className="bg-primary px-12 py-14 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-accent/15 rounded-2xl flex items-center justify-center mb-6">
          <svg width="44" height="44" viewBox="0 0 36 36" fill="none">
            <polygon points="18,3 21,12 30,12 23,18 25.5,27 18,22 10.5,27 13,18 6,12 15,12" fill="#F8C61E" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Tamayoz</h1>
        <p className="text-white/40 text-lg mb-6">تميّز</p>
        <div className="bg-accent/15 border border-accent/25 rounded-xl px-4 py-2.5 text-accent text-xs font-black uppercase tracking-wider mb-6">
          Stand Out · Get Assessed · Get Hired
        </div>
        <p className="text-white/40 text-sm leading-relaxed">
          Build your verified talent profile<br />and get discovered by UAE companies.
        </p>
      </div>

      {/* Right — form */}
      <div className="px-10 py-12 bg-white">
        <h2 className="text-xl font-black text-primary mb-1">Create your account</h2>
        <p className="text-sm text-muted mb-6">Join thousands of assessed UAE talents</p>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {['🔵 Google', '🔷 LinkedIn'].map(label => (
            <button key={label} className="btn-outline justify-center text-xs py-2.5">{label}</button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-5 text-xs text-gray-300">
          <div className="flex-1 h-px bg-gray-100" /> or email <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="space-y-3 mb-5">
          <input
            className="input-field"
            type="email"
            placeholder="name@example.com"
            value={profile.email}
            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
          />
          <div className="relative">
            <input
              className="input-field pr-12"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div className="space-y-2.5 mb-6">
          {[
            { id: 'terms',   label: 'I agree to the Terms & Conditions' },
            { id: 'privacy', label: 'I agree to AI evaluation & Privacy Policy' },
            { id: 'video',   label: 'I consent to video interview processing' },
          ].map(({ id, label }) => (
            <label key={id} className="flex items-start gap-2.5 cursor-pointer text-xs text-muted">
              <input
                type="checkbox"
                className="mt-0.5 accent-primary w-4 h-4"
                checked={consents[id as keyof typeof consents]}
                onChange={e => setConsents(p => ({ ...p, [id]: e.target.checked }))}
              />
              {label}
            </label>
          ))}
        </div>

        <button
          disabled={!allConsented}
          onClick={onNext}
          className="btn-primary w-full justify-center"
        >
          Create account <ArrowRight size={16} />
        </button>

        <p className="text-center text-sm text-muted mt-4">
          Already have an account?{' '}
          <button className="text-primary font-bold hover:underline">Log in</button>
        </p>
      </div>
    </div>
  )
}
