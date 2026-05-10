import { ArrowLeft, RefreshCw, ChevronRight, Award } from 'lucide-react'
import { Logo } from './ui/Logo'
import { TRAINING_ITEMS } from '../constants'
import type { AppView } from '../types'

interface TrainingProps { onNavigate: (v: AppView) => void }

export function Training({ onNavigate }: TrainingProps) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo />
          <nav className="flex gap-2">
            {(['dashboard','training','companies'] as AppView[]).map(v => (
              <button key={v} onClick={() => onNavigate(v)}
                className={`text-sm font-bold px-4 py-2 rounded-xl capitalize transition-colors ${v === 'training' ? 'bg-primary text-white' : 'text-muted hover:text-primary hover:bg-surface'}`}>
                {v === 'dashboard' ? 'Dashboard' : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mb-3">
              <ArrowLeft size={13} /> Back to dashboard
            </button>
            <h2 className="text-3xl font-black text-primary tracking-tight">Grow your skills & stand out</h2>
            <p className="text-muted mt-1 text-sm">Personalized recommendations for your specialization and UAE market trends.</p>
          </div>
          <div className="card bg-primary border-none p-5 flex items-center gap-5">
            <Award size={28} className="text-accent" />
            {[['Completed', '12'], ['Badges', '4']].map(([label, val]) => (
              <div key={label} className="pl-5 border-l border-white/15">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-black text-white">{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {TRAINING_ITEMS.map(item => (
            <div key={item.id} className="card p-6 flex flex-col gap-4 card-hover group">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: item.color + '18' }}>
                  {item.emoji}
                </div>
                <span className="badge badge-navy text-[9px]">{item.field}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-primary text-sm leading-snug group-hover:text-primary transition-colors mb-1">{item.title}</h4>
                <p className="text-xs text-muted">{item.type} · {item.duration}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-[9px] text-muted font-bold uppercase tracking-wider">By {item.provider}</span>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                  {item.type === 'Community' ? 'Join' : 'Enroll'} <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card bg-surface border border-gray-100 p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full border border-gray-100 flex items-center justify-center">
              <RefreshCw size={18} className="text-muted" />
            </div>
            <p className="text-sm font-semibold text-muted">Didn't find what you're looking for?</p>
          </div>
          <button className="btn-outline text-xs">Refresh recommendations</button>
        </div>

        <p className="text-center text-xs text-muted/60 max-w-md mx-auto leading-relaxed">
          Completing trainings gives you badges and helps companies see your growth. This activity is displayed separately from your Profile Strength Score.
        </p>
      </div>
    </div>
  )
}
