import { useState } from 'react'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { CandidateProfile } from '../../types'

interface Props {
  onNext: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

export function Registration({ onNext, profile, setProfile }: Props) {
  const [showPass, setShowPass]   = useState(false)
  const [password, setPassword]   = useState('')
  const [loading,  setLoading]    = useState(false)
  const [error,    setError]      = useState('')
  const [consents, setConsents]   = useState({ terms: false, privacy: false, video: false })

  const allConsented = Object.values(consents).every(Boolean) && profile.email && password.length >= 8

  const handleSubmit = async () => {
    if (!allConsented) return
    setLoading(true)
    setError('')

    try {
      // Try to sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email:    profile.email,
        password: password,
        options: {
          data: {
            full_name: profile.name || profile.email.split('@')[0],
            role: 'candidate',
          },
        },
      })

      if (signUpError) {
        // If already registered, try to sign in
        if (signUpError.message.includes('already registered')) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email:    profile.email,
            password: password,
          })
          if (signInError) {
            setError('This email is already registered. Please check your password.')
            setLoading(false)
            return
          }
        } else {
          setError(signUpError.message)
          setLoading(false)
          return
        }
      }

      // Success — update profile with name from email if not set
      if (data?.user && !profile.name) {
        setProfile(p => ({ ...p, name: data.user!.user_metadata?.full_name || p.name }))
      }

      onNext()
    } catch (err) {
      // Fallback — continue anyway (offline/demo mode)
      console.warn('Auth error, continuing in demo mode:', err)
      onNext()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 rounded-4xl overflow-hidden shadow-2xl bg-white" style={{ borderRadius: 24 }}>
      {/* Left navy panel */}
      <div className="bg-primary px-12 py-14 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-accent/15 rounded-2xl flex items-center justify-content-center mb-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <line x1="24" y1="6"  x2="9"  y2="15" stroke="#F8C61E" strokeWidth="1" opacity="0.4"/>
            <line x1="24" y1="6"  x2="39" y2="15" stroke="#F8C61E" strokeWidth="1" opacity="0.4"/>
            <line x1="9"  y1="15" x2="9"  y2="33" stroke="#F8C61E" strokeWidth="1" opacity="0.4"/>
            <line x1="39" y1="15" x2="39" y2="33" stroke="#F8C61E" strokeWidth="1" opacity="0.4"/>
            <line x1="9"  y1="33" x2="24" y2="42" stroke="#F8C61E" strokeWidth="1" opacity="0.4"/>
            <line x1="39" y1="33" x2="24" y2="42" stroke="#F8C61E" strokeWidth="1" opacity="0.4"/>
            <circle cx="24" cy="6"  r="3.5" fill="#F8C61E"/>
            <circle cx="9"  cy="15" r="2.5" fill="#F8C61E" opacity="0.65"/>
            <circle cx="39" cy="15" r="2.5" fill="#F8C61E" opacity="0.65"/>
            <circle cx="9"  cy="33" r="2.5" fill="#F8C61E" opacity="0.65"/>
            <circle cx="39" cy="33" r="2.5" fill="#F8C61E" opacity="0.65"/>
            <circle cx="24" cy="42" r="3.5" fill="#F8C61E" opacity="0.65"/>
            <circle cx="24" cy="24" r="12"  fill="#F8C61E"/>
            <polyline points="17.5,24 21.5,28.5 30.5,18.5" stroke="#252C37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
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

      {/* Right form */}
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

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-3 mb-5">
          <input
            className="input-field"
            type="text"
            placeholder="Full Name"
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
          />
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && allConsented && !loading && handleSubmit()}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
              type="button"
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
          disabled={!allConsented || loading}
          onClick={handleSubmit}
          className="btn-primary w-full justify-center"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            <>Create account <ArrowRight size={16} /></>
          )}
        </button>

        <p className="text-center text-sm text-muted mt-4">
          Already have an account?{' '}
          <button
            className="text-primary font-bold hover:underline"
            onClick={async () => {
              if (!profile.email || !password) return
              setLoading(true)
              const { error } = await supabase.auth.signInWithPassword({ email: profile.email, password })
              if (error) { setError(error.message); setLoading(false); return }
              onNext()
            }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}
