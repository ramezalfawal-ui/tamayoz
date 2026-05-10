import { useState } from 'react'
import { Upload, CheckCircle2, ArrowRight, FileText } from 'lucide-react'
import { CircularProgress } from '../ui/CircularProgress'
import { UAE_CITIES, AVAILABILITY_OPTIONS } from '../../constants'
import type { CandidateProfile } from '../../types'

interface Props {
  onNext: () => void
  onBack: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

export function ProfileBasics({ onNext, onBack, profile, setProfile }: Props) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const set = (key: keyof CandidateProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setProfile(p => ({ ...p, [key]: e.target.value }))

  const handleCv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCvFile(file)
      setProfile(p => ({ ...p, cvFileName: file.name }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-[200px_1fr] gap-6">
      {/* Sidebar */}
      <div className="card p-6 flex flex-col items-center text-center">
        <CircularProgress percentage={profile.completion} size={110} />
        <h4 className="font-bold text-primary mt-4 text-sm">Profile Strength</h4>
        <p className="text-xs text-muted mt-1 leading-relaxed">Complete each step to stand out to employers.</p>
        <div className="mt-4 w-full bg-surface rounded-xl p-3 text-left">
          <p className="text-[11px] font-black text-primary mb-1">🎯 Upload your CV</p>
          <p className="text-[10px] text-muted">Adds +20% to your score instantly</p>
        </div>
      </div>

      {/* Main */}
      <div className="space-y-5">
        {/* CV Upload */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary">Upload CV</h3>
              <p className="text-xs text-muted">PDF or DOCX · Max 6MB</p>
            </div>
          </div>
          <label className={`w-full h-28 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            cvFile ? 'border-primary/40 bg-primary/5' : 'border-gray-200 hover:border-gray-300 bg-surface'
          }`}>
            <input type="file" className="hidden" accept=".pdf,.docx,.doc" onChange={handleCv} />
            {cvFile ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={22} color="white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-primary">{cvFile.name}</p>
                  <p className="text-xs text-muted">Uploaded · AI will parse this</p>
                </div>
              </div>
            ) : (
              <>
                <Upload size={26} className="text-muted mb-2" />
                <p className="text-sm font-semibold text-muted">
                  Drop here or <span className="text-primary underline">browse</span>
                </p>
              </>
            )}
          </label>
        </div>

        {/* Form Fields */}
        <div className="card p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Full Name</label>
              <input className="input-field" type="text" placeholder="Ahmed Al Mansouri"
                value={profile.name} onChange={set('name')} />
            </div>
            <div>
              <label className="label-field">Phone Number</label>
              <input className="input-field" type="tel" placeholder="+971 50 123 4567"
                value={profile.phone} onChange={set('phone')} />
            </div>
            <div>
              <label className="label-field">City</label>
              <select className="input-field" value={profile.city} onChange={set('city')}>
                {UAE_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label-field">Availability</label>
              <select className="input-field" value={profile.availability} onChange={set('availability')}>
                {AVAILABILITY_OPTIONS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label-field">LinkedIn URL</label>
              <input className="input-field" type="url" placeholder="linkedin.com/in/username"
                value={profile.linkedin || ''} onChange={set('linkedin')} />
            </div>
            <div>
              <label className="label-field">Years of Experience</label>
              <select className="input-field" value={profile.yearsExp || ''} onChange={set('yearsExp')}>
                <option value="">Select</option>
                {['Less than 1 year','1–2 years','3–5 years','5–10 years','10+ years'].map(y => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <label className="label-field">Expected Salary (AED / month)</label>
            <div className="flex items-center gap-3">
              <input className="input-field text-center" type="number" placeholder="Min"
                value={profile.salaryMin || ''} onChange={e => setProfile(p => ({ ...p, salaryMin: +e.target.value }))} />
              <span className="text-gray-300 font-bold">—</span>
              <input className="input-field text-center" type="number" placeholder="Max"
                value={profile.salaryMax || ''} onChange={e => setProfile(p => ({ ...p, salaryMax: +e.target.value }))} />
            </div>
            <p className="text-xs text-muted italic mt-2">Shown as a guideline to companies only.</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button onClick={onBack} className="btn-outline">← Back</button>
          <button onClick={onNext} className="btn-primary">Save & Continue <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  )
}
