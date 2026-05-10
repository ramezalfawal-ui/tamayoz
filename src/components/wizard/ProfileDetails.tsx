import { useState } from 'react'
import { Plus, Trash2, Edit2, GraduationCap, Briefcase, Star, Languages, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { CircularProgress } from '../ui/CircularProgress'
import type { CandidateProfile, Education, WorkExperience, Language } from '../../types'
import { LANGUAGE_LEVELS } from '../../constants'

interface Props {
  onNext: () => void
  onBack: () => void
  profile: CandidateProfile
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>
}

function genId() { return Math.random().toString(36).slice(2) }

export function ProfileDetails({ onNext, onBack, profile, setProfile }: Props) {
  const [open, setOpen] = useState({ edu: true, work: true, skills: false, langs: false })
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }))
  const [newSkill, setNewSkill] = useState('')

  const addEducation = () => {
    const item: Education = { id: genId(), degree: '', institution: '', yearFrom: '2020', yearTo: '2024' }
    setProfile(p => ({ ...p, education: [...(p.education || []), item] }))
  }
  const removeEdu = (id: string) => setProfile(p => ({ ...p, education: p.education.filter(e => e.id !== id) }))
  const updateEdu = (id: string, field: keyof Education, val: string) =>
    setProfile(p => ({ ...p, education: p.education.map(e => e.id === id ? { ...e, [field]: val } : e) }))

  const addWork = () => {
    const item: WorkExperience = { id: genId(), title: '', company: '', yearFrom: '2022', yearTo: '', current: false, description: '' }
    setProfile(p => ({ ...p, experience: [...(p.experience || []), item] }))
  }
  const removeWork = (id: string) => setProfile(p => ({ ...p, experience: p.experience.filter(e => e.id !== id) }))
  const updateWork = (id: string, field: keyof WorkExperience, val: string | boolean) =>
    setProfile(p => ({ ...p, experience: p.experience.map(e => e.id === id ? { ...e, [field]: val } : e) }))

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(p => ({ ...p, skills: [...p.skills, newSkill.trim()] }))
      setNewSkill('')
    }
  }
  const removeSkill = (s: string) => setProfile(p => ({ ...p, skills: p.skills.filter(x => x !== s) }))

  const addLang = () => {
    const lang: Language = { name: '', level: 'Fluent' }
    setProfile(p => ({ ...p, languages: [...(p.languages || []), lang] }))
  }
  const updateLang = (idx: number, field: keyof Language, val: string) =>
    setProfile(p => ({ ...p, languages: p.languages.map((l, i) => i === idx ? { ...l, [field]: val } : l) }))
  const removeLang = (idx: number) => setProfile(p => ({ ...p, languages: p.languages.filter((_, i) => i !== idx) }))

  const SectionHeader = ({ sectionKey, title, icon: Icon, onAdd }: { sectionKey: keyof typeof open; title: string; icon: React.ComponentType<{ size?: number; className?: string }>; onAdd: () => void }) => (
    <div
      className="flex items-center justify-between p-5 cursor-pointer hover:bg-surface/50 transition-colors"
      onClick={() => tog(sectionKey)}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-surface rounded-lg flex items-center justify-center">
          <Icon size={18} className="text-muted" />
        </div>
        <h3 className="font-bold text-primary">{title}</h3>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={e => { e.stopPropagation(); onAdd() }}
          className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
        >
          <Plus size={13} /> Add
        </button>
        {open[sectionKey] ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-[200px_1fr] gap-6">
      <div className="card p-6 flex flex-col items-center text-center self-start">
        <CircularProgress percentage={profile.completion} size={110} />
        <h4 className="font-bold text-primary mt-4 text-sm">Keep going!</h4>
        <p className="text-xs text-muted mt-1">You're almost done.</p>
      </div>

      <div className="space-y-4">
        {/* Education */}
        <div className="card overflow-hidden">
          <SectionHeader sectionKey="edu" title="Education" icon={GraduationCap} onAdd={addEducation} />
          {open.edu && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
              {(profile.education || []).map(edu => (
                <div key={edu.id} className="bg-surface rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input-field text-sm" placeholder="Degree / Qualification" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} />
                    <input className="input-field text-sm" placeholder="Institution" value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} />
                    <input className="input-field text-sm" placeholder="Year from" value={edu.yearFrom} onChange={e => updateEdu(edu.id, 'yearFrom', e.target.value)} />
                    <input className="input-field text-sm" placeholder="Year to" value={edu.yearTo} onChange={e => updateEdu(edu.id, 'yearTo', e.target.value)} />
                  </div>
                  <button onClick={() => removeEdu(edu.id)} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                </div>
              ))}
              {(profile.education || []).length === 0 && (
                <p className="text-sm text-muted text-center py-4">No education added yet. Click + Add.</p>
              )}
            </div>
          )}
        </div>

        {/* Work Experience */}
        <div className="card overflow-hidden">
          <SectionHeader sectionKey="work" title="Work Experience" icon={Briefcase} onAdd={addWork} />
          {open.work && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
              {(profile.experience || []).map(exp => (
                <div key={exp.id} className="bg-surface rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input-field text-sm" placeholder="Job Title" value={exp.title} onChange={e => updateWork(exp.id, 'title', e.target.value)} />
                    <input className="input-field text-sm" placeholder="Company" value={exp.company} onChange={e => updateWork(exp.id, 'company', e.target.value)} />
                    <input className="input-field text-sm" placeholder="Year from" value={exp.yearFrom} onChange={e => updateWork(exp.id, 'yearFrom', e.target.value)} />
                    <input className="input-field text-sm" placeholder="Year to / Present" value={exp.yearTo} onChange={e => updateWork(exp.id, 'yearTo', e.target.value)} />
                  </div>
                  <textarea className="input-field text-sm" rows={2} placeholder="Brief description of your role and achievements..." value={exp.description} onChange={e => updateWork(exp.id, 'description', e.target.value)} />
                  <button onClick={() => removeWork(exp.id)} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"><Trash2 size={12} /> Remove</button>
                </div>
              ))}
              {(profile.experience || []).length === 0 && (
                <p className="text-sm text-muted text-center py-4">No experience added yet. Click + Add.</p>
              )}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="card overflow-hidden">
          <SectionHeader sectionKey="skills" title="Skills" icon={Star} onAdd={() => setOpen(p => ({ ...p, skills: true }))} />
          {open.skills && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
              <div className="flex gap-2">
                <input className="input-field text-sm" placeholder="Add a skill (e.g. React, Excel...)" value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()} />
                <button onClick={addSkill} className="btn-primary px-4 py-2.5 text-xs">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(s => (
                  <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold">
                    {s}
                    <button onClick={() => removeSkill(s)} className="hover:text-red-500 transition-colors"><Trash2 size={11} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Languages */}
        <div className="card overflow-hidden">
          <SectionHeader sectionKey="langs" title="Languages" icon={Languages} onAdd={addLang} />
          {open.langs && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
              {(profile.languages || []).map((lang, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <input className="input-field text-sm" placeholder="Language" value={lang.name} onChange={e => updateLang(idx, 'name', e.target.value)} />
                  <select className="input-field text-sm" value={lang.level} onChange={e => updateLang(idx, 'level', e.target.value)}>
                    {LANGUAGE_LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                  <button onClick={() => removeLang(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              ))}
              {(profile.languages || []).length === 0 && (
                <p className="text-sm text-muted text-center py-4">No languages added. Click + Add.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-2">
          <button onClick={onBack} className="btn-outline">← Back</button>
          <button onClick={onNext} className="btn-primary">Save & Continue <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  )
}
