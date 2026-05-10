import { useState } from 'react'
import { User, Briefcase, MapPin, Award, Star, LayoutDashboard, Video, Database, FileDown, RefreshCw, ChevronRight, Play, EyeOff } from 'lucide-react'
import { Logo } from './ui/Logo'
import { CircularProgress } from './ui/CircularProgress'
import { SPECIALIZATIONS } from '../constants'
import type { CandidateProfile, AppView } from '../types'

interface Props {
  profile: CandidateProfile
  onNavigate: (view: AppView) => void
}

type Tab = 'overview' | 'media' | 'documents'

export function Dashboard({ profile, onNavigate }: Props) {
  const [tab, setTab] = useState<Tab>('overview')
  const score = profile.aiResult?.overall ?? 76
  const spec = SPECIALIZATIONS.find(s => s.id === profile.specialization)

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            {[
              { label: 'Dashboard', view: 'dashboard' as AppView },
              { label: 'Training', view: 'training' as AppView },
              { label: 'Companies', view: 'companies' as AppView },
            ].map(({ label, view }) => (
              <button key={label} onClick={() => onNavigate(view)}
                className={`text-sm font-bold px-4 py-2 rounded-xl transition-colors ${view === 'dashboard' ? 'bg-primary text-white' : 'text-muted hover:text-primary hover:bg-surface'}`}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Profile hero */}
        <div className="card p-8 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="relative">
            <div className="w-20 h-20 bg-surface rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
              <User size={44} className="text-muted" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-primary rounded-lg flex items-center justify-center border-2 border-white">
              <Award size={16} className="text-accent" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-3xl font-black text-primary tracking-tight">{profile.name || 'Your Name'}</h2>
              <span className="badge badge-accent">Score: {score}/100</span>
              <span className="badge badge-green">✓ Tamayoz Verified</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {spec && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-muted bg-surface px-3 py-1.5 rounded-lg">
                  <Briefcase size={13} /> {spec.title}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted bg-surface px-3 py-1.5 rounded-lg">
                <MapPin size={13} /> {profile.city || 'Dubai'}, UAE
              </span>
            </div>
          </div>
          <div className="text-center p-5 bg-surface rounded-2xl">
            <CircularProgress percentage={profile.completion} size={90} strokeWidth={8} />
            <p className="text-[9px] font-black text-muted uppercase tracking-wider mt-2">Profile Done</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface rounded-2xl p-1 w-fit">
          {(['overview', 'media', 'documents'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                tab === t ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-primary'
              }`}>{t}</button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1fr_270px] gap-5">
          <div className="space-y-5">
            {tab === 'overview' && (
              <>
                <div className="card p-6 space-y-5">
                  <h4 className="font-bold text-primary flex items-center gap-2"><Star size={17} className="text-muted" /> Core Profile</h4>
                  <div>
                    <p className="label-field">Specialization</p>
                    <div className="flex flex-wrap gap-2">
                      {spec ? (
                        <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold">{spec.title}</span>
                      ) : <span className="text-sm text-muted">Not selected</span>}
                    </div>
                  </div>
                  <div>
                    <p className="label-field">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.length > 0 ? profile.skills.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-surface text-muted rounded-lg text-xs font-semibold">{s}</span>
                      )) : <span className="text-sm text-muted">No skills added yet</span>}
                    </div>
                  </div>
                  {profile.aiResult && (
                    <div>
                      <p className="label-field">AI Feedback</p>
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                        <p className="text-xs text-muted leading-relaxed italic">"{profile.aiResult.topStrength}"</p>
                        <p className="text-xs text-primary font-bold mt-2">{profile.aiResult.readinessLevel}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-primary flex items-center gap-2"><LayoutDashboard size={17} className="text-muted" /> Learning Progress</h4>
                    <button onClick={() => onNavigate('training')} className="text-xs font-bold text-primary hover:underline">View all</button>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <p className="text-sm font-semibold text-primary">Cloud Architecture Badge</p>
                      <p className="text-xs font-bold text-muted">75%</p>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    {['#F8C61E', '#22c55e', '#F2F4F7'].map((bg, i) => (
                      <div key={i} className="w-11 h-11 rounded-xl flex items-center justify-center text-lg border-2"
                        style={{ background: bg, borderColor: i === 2 ? '#e5e7eb' : 'transparent', borderStyle: i === 2 ? 'dashed' : 'solid' }}>
                        🏅
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'media' && (
              <div className="card p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-primary flex items-center gap-2"><Video size={17} className="text-muted" /> Introduction Video</h4>
                  <span className="badge badge-green"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Visible to companies</span>
                </div>
                <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center cursor-pointer group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play size={26} color="white" fill="white" />
                  </div>
                </div>
                <button className="btn-outline text-sm"><EyeOff size={15} /> Change visibility</button>
              </div>
            )}

            {tab === 'documents' && (
              <div className="card p-6 space-y-4">
                <h4 className="font-bold text-primary">Your Documents</h4>
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                      <Database size={22} className="text-muted" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary">{profile.cvFileName || `${profile.name || 'Candidate'}_CV.pdf`}</p>
                      <p className="text-xs text-muted">Uploaded · 1.2 MB</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline p-2.5"><FileDown size={18} /></button>
                    <button className="btn-outline p-2.5"><RefreshCw size={18} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card bg-primary border-none p-5 space-y-4">
              <h4 className="font-bold text-white text-sm">Improve your results</h4>
              {(profile.aiResult?.criticalActions ?? ['Add more work experience', 'Verify 5+ more skills', 'Upload video intro']).slice(0, 3).map((action, i) => (
                <div key={i} className="flex gap-3 p-3 bg-white/8 rounded-xl border border-white/8 cursor-pointer hover:bg-white/15 transition-colors">
                  <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{action}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => onNavigate('training')} className="btn-accent w-full justify-center text-xs">
                View recommended training →
              </button>
            </div>

            <div className="card border-primary/15 bg-primary/5 p-5 space-y-3">
              <h4 className="font-bold text-primary text-sm">Company discovery</h4>
              <p className="text-xs text-muted leading-relaxed">UAE companies are searching for candidates in your field right now.</p>
              <button onClick={() => onNavigate('companies')} className="btn-outline w-full justify-center text-xs">
                Browse companies <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
