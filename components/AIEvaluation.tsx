import { useState, useEffect, useRef } from 'react'
import { Sparkles, Target, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { CircularProgress } from '../ui/CircularProgress'
import { LOAD_MESSAGES } from '../../constants'
import type { CandidateProfile, AIEvaluation as AIResult, ScoreResult } from '../../types'

// ── Toggle this to switch between MOCK and REAL AI ──────
const USE_MOCK = true  // ← change to false when ready for real AI
// ────────────────────────────────────────────────────────

const MOCK_RESULT: AIResult = {
  overall: 74,
  scores: [
    { title: 'Profile completeness', score: 8.2, label: 'Strong',     tips: ['Profile fields completed', 'Add LinkedIn URL to boost visibility'] },
    { title: 'CV quality',           score: 6.5, label: 'Good',       tips: ['Upload a CV to unlock full analysis', 'Add measurable achievements'] },
    { title: 'Cover letter',         score: 7.1, label: 'Good',       tips: ['Good field-specific language', 'Add more UAE market context'] },
    { title: 'Interview readiness',  score: 6.0, label: 'Good',       tips: ['Practice common UAE interview questions', 'Prepare field-specific examples'] },
    { title: 'UAE market fit',        score: 7.5, label: 'Good',       tips: ['Good alignment with UAE demand', 'Consider highlighting Arabic proficiency'] },
    { title: 'Communication clarity', score: 6.8, label: 'Good',       tips: ['Video interview will strengthen this score', 'Written communication looks solid'] },
  ],
  criticalActions: [
    'Upload your CV to unlock AI parsing',
    'Complete your video introduction',
    'Add 5+ verified skills to your profile',
  ],
  readinessLevel: 'Job Ready',
  topStrength: 'Good foundational profile with clear specialization and relevant UAE market positioning.',
  developmentTip: 'Upload your CV and record a 3-minute video introduction to significantly boost your hiring readiness score.',
}

async function runRealAI(profile: CandidateProfile): Promise<AIResult> {
  const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''
  const specTitle = profile.specialization || 'General'
  const prompt = `You are Tamayoz AI, a talent assessment system for the UAE/GCC job market.
Evaluate this candidate and return ONLY valid JSON — no markdown, no backticks, no explanation.

Candidate:
- Specialization: ${specTitle}
- Cover Letter: ${profile.coverLetter || 'Not provided'}
- Name: ${profile.name || 'Candidate'}

Return this exact JSON:
{"overall":75,"scores":[{"title":"Profile completeness","score":8.5,"label":"Strong","tips":["tip1","tip2"]},{"title":"CV quality","score":6.2,"label":"Good","tips":["tip1","tip2"]},{"title":"Cover letter","score":7.8,"label":"Good","tips":["tip1","tip2"]},{"title":"Interview readiness","score":6.0,"label":"Good","tips":["tip1","tip2"]},{"title":"UAE market fit","score":7.5,"label":"Good","tips":["tip1","tip2"]},{"title":"Communication clarity","score":6.5,"label":"Good","tips":["tip1","tip2"]}],"criticalActions":["action1","action2","action3"],"readinessLevel":"Job Ready","topStrength":"strength sentence","developmentTip":"tip sentence"}

Labels must be: "Strong", "Good", or "Needs work". Overall: 55–92.`

  const response = await fetch('/api/claude/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }),
  })
  const data = await response.json()
  const text = data.content.map((b: { text?: string }) => b.text || '').join('').trim().replace(/^```json\s*/i,'').replace(/```\s*$/i,'').trim()
  return JSON.parse(text) as AIResult
}

interface Props {
  onFinish: (result: AIResult) => void
  onBack:   () => void
  profile:  CandidateProfile
}

const LABEL_COLOR: Record<string, string> = {
  'Strong':     'text-emerald-600',
  'Good':       'text-blue-600',
  'Needs work': 'text-orange-500',
}

function ScoreCard({ score }: { score: ScoreResult }) {
  return (
    <div className="card p-5 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-sm text-primary">{score.title}</h4>
          <p className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${LABEL_COLOR[score.label]}`}>● {score.label}</p>
        </div>
        <div className="text-2xl font-black text-gray-200">{score.score.toFixed(1)}<span className="text-xs font-bold text-muted">/10</span></div>
      </div>
      {score.tips.map((tip, i) => (
        <div key={i} className="flex gap-2 text-xs text-muted leading-relaxed">
          <CheckCircle2 size={13} className={`flex-shrink-0 mt-0.5 ${LABEL_COLOR[score.label]}`} />
          {tip}
        </div>
      ))}
    </div>
  )
}

export function AIEvaluation({ onFinish, onBack, profile }: Props) {
  const [state, setState]   = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<AIResult | null>(null)
  const [error,  setError]  = useState('')
  const [loadMsg, setLoadMsg] = useState(LOAD_MESSAGES[0])
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const run = async () => {
    setState('loading'); setError('')
    let i = 0
    intervalRef.current = setInterval(() => {
      i = Math.min(i + 1, LOAD_MESSAGES.length - 1)
      setLoadMsg(LOAD_MESSAGES[i])
    }, 1800)
    try {
      let res: AIResult
      if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 2200)) // simulate delay
        res = { ...MOCK_RESULT, overall: 70 + Math.floor(Math.random() * 15) }
      } else {
        res = await runRealAI(profile)
      }
      clearInterval(intervalRef.current)
      setResult(res)
      setState('done')
    } catch (e) {
      clearInterval(intervalRef.current)
      setError('Could not connect to AI. Please check your API key and try again.')
      setState('error')
    }
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  if (state === 'loading') return (
    <div className="max-w-lg mx-auto mt-16 text-center">
      <div className="card p-10 space-y-5">
        <div className="w-14 h-14 border-4 border-surface border-t-primary rounded-full animate-spin mx-auto" />
        <h3 className="text-lg font-black text-primary">
          {USE_MOCK ? '🧪 Test Mode — Generating mock scores...' : 'Tamayoz AI is working...'}
        </h3>
        <p className="text-sm text-muted min-h-[40px]">{loadMsg}</p>
        {USE_MOCK && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-semibold">
            ⚡ Test mode is ON — no API credits used
          </div>
        )}
      </div>
    </div>
  )

  if (state === 'done' && result) return (
    <div className="max-w-5xl mx-auto space-y-5 animate-fade-up">
      {USE_MOCK && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-amber-700 font-bold">
          🧪 TEST MODE — scores are mock data · change USE_MOCK to false in AIEvaluation.tsx to use real AI
        </div>
      )}
      <div className="bg-primary rounded-3xl p-8 grid md:grid-cols-[auto_1fr] gap-8 items-center">
        <div className="scale-110">
          <CircularProgress percentage={result.overall} size={148} strokeWidth={13} color="#F8C61E" />
        </div>
        <div className="space-y-3">
          <span className="badge badge-accent"><Sparkles size={12} /> {USE_MOCK ? 'Mock Assessment Complete' : 'AI Analysis Complete'}</span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Your profile is looking {result.overall >= 80 ? 'excellent' : result.overall >= 65 ? 'great' : 'promising'}!
          </h2>
          <p className="text-white/65 text-sm leading-relaxed">{result.topStrength}</p>
          <span className="badge badge-accent">{result.readinessLevel}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {result.scores.map(s => <ScoreCard key={s.title} score={s} />)}
      </div>
      <div className="grid md:grid-cols-[1fr_auto] gap-4">
        <div className="card bg-primary/5 border-primary/15 p-5 flex items-center justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Target size={22} className="text-accent" />
            </div>
            <div>
              <p className="font-bold text-primary text-sm">Ready to be discovered?</p>
              <p className="text-xs text-muted mt-0.5">{result.developmentTip}</p>
            </div>
          </div>
          <button onClick={() => onFinish(result)} className="btn-primary flex-shrink-0">
            View Tamayoz Profile <ArrowRight size={16} />
          </button>
        </div>
        <div className="card bg-primary border-none p-5 space-y-3 min-w-[210px]">
          <p className="text-xs font-black text-white flex items-center gap-1.5">
            <AlertCircle size={13} className="text-accent" /> Critical actions
          </p>
          {result.criticalActions.map((a, i) => (
            <div key={i} className="flex justify-between items-center bg-white/8 rounded-lg px-3 py-2 text-[11px] text-white/80 font-semibold cursor-pointer hover:bg-white/15 transition-colors">
              {a} <ArrowRight size={11} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="card p-10 text-center space-y-5">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles size={38} className="text-accent" />
        </div>
        {USE_MOCK && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-700 font-bold inline-block">
            🧪 Test mode ON — no API credits used
          </div>
        )}
        <h2 className="text-2xl font-black text-primary">
          {USE_MOCK ? 'Ready for your Test Assessment?' : 'Ready for your AI Assessment?'}
        </h2>
        <p className="text-muted text-sm leading-relaxed max-w-md mx-auto">
          {USE_MOCK
            ? 'This will generate realistic mock scores so you can test the full dashboard flow without using API credits.'
            : 'Tamayoz AI will evaluate your profile, cover letter, and readiness for the UAE job market.'}
        </p>
        {(state === 'error' || error) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-left">{error}</div>
        )}
        <button onClick={run} className="btn-primary mx-auto text-base px-8 py-3.5">
          <Sparkles size={18} /> {USE_MOCK ? 'Run Test Evaluation' : 'Run AI Evaluation'}
        </button>
      </div>
      <div className="flex justify-start">
        <button onClick={onBack} className="btn-outline">← Back</button>
      </div>
    </div>
  )
}
