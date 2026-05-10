import { useState } from 'react'
import { Video, Play, Info, CheckCircle2, ArrowRight } from 'lucide-react'
import type { CandidateProfile } from '../../types'

interface Props {
  onNext: () => void
  onBack: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

const TIPS = [
  'Use good lighting and ensure your background is professional.',
  'Speak clearly from a quiet environment.',
  'Focus on 1–2 specific achievements you\'re proud of.',
  'Keep it concise, friendly, and enthusiastic.',
  'Look at the camera — not at the screen.',
]

export function VideoUpload({ onNext, onBack, profile, setProfile }: Props) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [visible, setVisible] = useState(true)

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      setProfile(p => ({ ...p, videoFileName: file.name }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_240px] gap-6">
      <div className="space-y-5">
        <div className="card p-7 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-primary tracking-tight">Record your video introduction</h2>
            <p className="text-sm text-muted mt-1">3–5 minutes max. Talk about your background and why you're a strong candidate.</p>
          </div>

          {!videoFile ? (
            <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-200 hover:border-primary/40 bg-surface hover:bg-primary/5 rounded-2xl cursor-pointer transition-all group">
              <input type="file" className="hidden" accept="video/*" onChange={handleVideo} />
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-105 transition-transform">
                <Video size={30} className="text-primary" />
              </div>
              <p className="font-bold text-primary text-sm">Drag & drop your video</p>
              <p className="text-xs text-muted mt-1">MP4, MOV · Max 250MB</p>
              <div className="mt-5 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold group-hover:bg-primary-hover transition-colors">
                Browse file
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <Play size={26} color="white" fill="white" />
                </div>
                <div className="absolute top-3 right-3 bg-accent text-primary text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Pending AI Review
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
                <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Our AI will analyze your video for communication and confidence metrics. This won't delay your profile submission.
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-primary">Allow companies to view my video</p>
              <p className="text-xs text-muted mt-0.5">Hiding makes your profile unlisted.</p>
            </div>
            <button
              onClick={() => setVisible(v => !v)}
              className={`w-13 h-7 rounded-full transition-colors relative flex-shrink-0 border-none ${visible ? 'bg-primary' : 'bg-gray-200'}`}
              style={{ width: 52, height: 28 }}
            >
              <div className={`absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full transition-all shadow-sm ${visible ? 'left-[27px]' : 'left-[3px]'}`} />
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={onBack} className="btn-outline">← Back</button>
          <button onClick={onNext} className="btn-primary">Save & Continue <ArrowRight size={16} /></button>
        </div>
      </div>

      <div className="card bg-primary/5 border-primary/15 p-6 space-y-4 self-start">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={18} className="text-primary" />
          <h4 className="font-bold text-primary text-sm">Tips for a great video</h4>
        </div>
        {TIPS.map((tip, i) => (
          <div key={i} className="flex gap-2.5 text-xs text-muted leading-relaxed">
            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
            {tip}
          </div>
        ))}
      </div>
    </div>
  )
}
