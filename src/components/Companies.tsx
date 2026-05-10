import { useState } from 'react'
import { Search, MapPin, Filter, Building2, Heart, Share2, Users, ArrowLeft, ChevronRight } from 'lucide-react'
import { Logo } from './ui/Logo'
import { COMPANIES } from '../constants'
import type { AppView } from '../types'

interface Props { onNavigate: (v: AppView) => void }

export function Companies({ onNavigate }: Props) {
  const [search, setSearch] = useState('')
  const [field,  setField]  = useState('All Fields')
  const [city,   setCity]   = useState('All Cities')
  const [toast,  setToast]  = useState<string | null>(null)

  const filtered = COMPANIES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !search || c.name.toLowerCase().includes(q) || c.field.toLowerCase().includes(q)
    const matchCity   = city  === 'All Cities'  || c.location.includes(city)
    const matchField  = field === 'All Fields'  || c.field.toLowerCase().includes(field.toLowerCase())
    return matchSearch && matchCity && matchField
  })

  const showInterest = (name: string) => {
    setToast(name)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <nav className="flex gap-2">
            {(['dashboard','training','companies'] as AppView[]).map(v => (
              <button key={v} onClick={() => onNavigate(v)}
                className={`text-sm font-bold px-4 py-2 rounded-xl capitalize transition-colors ${v === 'companies' ? 'bg-primary text-white' : 'text-muted hover:text-primary hover:bg-surface'}`}>
                {v === 'dashboard' ? 'Dashboard' : v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mb-3">
            <ArrowLeft size={13} /> Back to dashboard
          </button>
          <h2 className="text-3xl font-black text-primary tracking-tight">Browse Companies</h2>
          <p className="text-muted mt-1 text-sm">Discover UAE employers looking for candidates in your field.</p>
        </div>

        {/* Search bar */}
        <div className="grid grid-cols-[1fr_160px_160px_44px] gap-3 items-center">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input className="input-field pl-10 text-sm" placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field text-sm" value={field} onChange={e => setField(e.target.value)}>
            {['All Fields','IT & Tech','Finance','Marketing','Design','Logistics'].map(o => <option key={o}>{o}</option>)}
          </select>
          <select className="input-field text-sm" value={city} onChange={e => setCity(e.target.value)}>
            {['All Cities','Dubai','Abu Dhabi','Sharjah'].map(o => <option key={o}>{o}</option>)}
          </select>
          <button className="btn-outline justify-center p-3"><Filter size={17} /></button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <Building2 size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold">No companies found</p>
            <p className="text-sm mt-1">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map(company => (
              <div key={company.id} className="card p-6 card-hover flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center border border-gray-100">
                    <Building2 size={28} className="text-muted" />
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline p-2.5 rounded-xl hover:text-red-500 hover:border-red-200"><Heart size={16} /></button>
                    <button className="btn-outline p-2.5 rounded-xl hover:text-primary"><Share2 size={16} /></button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-lg text-primary">{company.name}</h4>
                    {company.verified && <span className="badge badge-green text-[9px]">✓ Verified</span>}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-muted">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-primary" /> {company.location}</span>
                    <span className="flex items-center gap-1"><Users size={11} className="text-primary" /> {company.size} employees</span>
                  </div>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  Leading player in {company.field} with a focus on innovation and digital transformation in the Middle East.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {company.roles.map(r => (
                    <span key={r} className="px-2 py-1 bg-surface text-muted text-[10px] font-bold rounded-md border border-gray-100">{r}</span>
                  ))}
                  <span className="px-2 py-1 bg-primary/8 text-primary text-[10px] font-black rounded-md border border-primary/15">+5 more</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="btn-outline justify-center text-xs py-2.5">View profile</button>
                  <button onClick={() => showInterest(company.name)} className="btn-primary justify-center text-xs py-2.5">Show interest</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl z-50 min-w-[300px] animate-fade-up">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-lg flex-shrink-0">✨</div>
          <div>
            <p className="text-white font-bold text-sm">Interest shared!</p>
            <p className="text-white/50 text-xs">Your Tamayoz profile is now visible to {toast}.</p>
          </div>
        </div>
      )}
    </div>
  )
}
