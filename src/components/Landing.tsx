import { useState } from 'react'
import { Logo } from './ui/Logo'
import type { AppView } from '../types'

interface Props {
  onNavigate: (v: AppView) => void
}

export function Landing({ onNavigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .dot-pulse { animation: pulse-dot 2s infinite; }
        .nav-link { font-size:14px;font-weight:600;color:#6B7280;transition:color 0.2s;text-decoration:none; }
        .nav-link:hover { color:#252C37; }
        .logo-company { font-size:14px;font-weight:800;color:#c0c8d6;letter-spacing:-0.02em;transition:color 0.2s;cursor:default; }
        .logo-company:hover { color:#6B7280; }
        .score-bar { transition: width 0s; }
        .score-bar.animated { transition: width 1.5s ease; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {[['#how','How It Works'],['#features','Features'],['#candidates','Candidates'],['#companies','Companies'],['#pricing','Pricing']].map(([href,label])=>(
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onNavigate('wizard')} className="text-sm font-bold text-primary border border-gray-200 rounded-xl px-5 py-2.5 hover:bg-surface transition-colors">Log in</button>
            <button onClick={() => onNavigate('wizard')} className="text-sm font-bold bg-primary text-white rounded-xl px-5 py-2.5 hover:bg-primary-hover transition-colors shadow-primary">Get Started Free</button>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="w-5 h-0.5 bg-primary rounded" /><span className="w-5 h-0.5 bg-primary rounded" /><span className="w-5 h-0.5 bg-primary rounded" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-primary/95 flex flex-col items-center justify-center gap-8">
            <button className="absolute top-6 right-6 text-white text-2xl" onClick={() => setMenuOpen(false)}>✕</button>
            {[['#how','How It Works'],['#features','Features'],['#candidates','Candidates'],['#companies','Companies'],['#pricing','Pricing']].map(([href,label])=>(
              <a key={href} href={href} className="text-2xl font-black text-white" onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); onNavigate('wizard') }} className="btn-accent text-base px-8 py-3.5 mt-2">Get Started Free →</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-primary overflow-hidden relative py-28">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-accent/5 -top-40 -right-20 pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-accent/3 -bottom-20 -left-10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 text-accent text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent dot-pulse" />
              UAE's #1 AI Talent Assessment Platform
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight leading-[1.08] mb-5">
              Stand Out.<br />Get <span className="text-accent">Assessed.</span><br />Get Hired.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Tamayoz goes beyond the CV. Build a verified talent profile through AI analysis, video interviews, and practical tests — then get discovered by UAE's top companies.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => onNavigate('wizard')} className="flex items-center gap-2 bg-accent text-primary font-black text-base px-7 py-3.5 rounded-2xl shadow-accent hover:bg-accent-hover transition-all hover:-translate-y-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Build Your Profile — Free
              </button>
              <a href="#how" className="flex items-center gap-2 text-white font-bold text-base px-7 py-3.5 rounded-2xl border border-white/25 hover:bg-white/10 transition-all">Watch how it works</a>
            </div>
            <div className="flex gap-10 pt-6 border-t border-white/10">
              {[['5,000+','Assessed Talents'],['300+','UAE Companies'],['87%','Hiring Success']].map(([val,label])=>(
                <div key={label}>
                  <div className="text-3xl font-black text-white tracking-tight">{val}</div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Card */}
          <div className="animate-float hidden md:block">
            <div className="bg-white/6 border border-white/12 rounded-3xl p-6 backdrop-blur-sm">
              <div className="text-[10px] font-black text-white/35 uppercase tracking-wider mb-4">✨ Tamayoz AI Assessment</div>
              <div className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-2xl p-4 mb-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-xl flex-shrink-0">👩‍💼</div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-white">Sara Al Amri</div>
                  <div className="text-[11px] text-white/50 mt-0.5">Digital Marketing · Dubai</div>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded-full">✓ Verified</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[['87','Readiness'],['91','Interview'],['78','Practical']].map(([val,key])=>(
                  <div key={key} className="bg-white/6 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-accent leading-none">{val}</div>
                    <div className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-1">{key}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-accent/20 text-accent text-[10px] font-bold px-3 py-1 rounded-full">⭐ Top Talent</span>
                <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full">✓ CV Verified</span>
                <span className="bg-blue-500/15 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full">🎥 Video Ready</span>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-3.5">
                <div className="text-[9px] font-black text-accent uppercase tracking-wider mb-1">AI Feedback</div>
                <div className="text-[11px] text-white/65 leading-relaxed">"Strong communication skills. Add 2 more case studies to reach <strong className="text-accent">Top Talent</strong> status."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <div className="border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-gray-300 uppercase tracking-widest mb-7">Trusted by candidates from UAE's leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['Etisalat by e&','Bayut | dubizzle','DP World','Careem','Emaar','ADNOC','Talabat'].map(c=>(
              <span key={c} className="logo-company">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-muted uppercase tracking-widest bg-surface border border-gray-200 px-4 py-1.5 rounded-full">How It Works</span>
            <h2 className="text-4xl font-black text-primary tracking-tight mt-5 mb-3">From signup to job offer —<br /><span className="text-accent">in days, not months</span></h2>
            <p className="text-muted max-w-md mx-auto">A complete assessment journey that proves your real abilities to employers.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              {n:'01',icon:'📝',title:'Register & Choose Your Field',desc:'Create your free account and select your specialization — IT, Marketing, Accounting, Design, Content, or Sales.'},
              {n:'02',icon:'🤖',title:'AI Analyzes Your Profile',desc:'Upload your CV and our AI extracts your skills, experience, and gaps — then scores your profile automatically.'},
              {n:'03',icon:'🎥',title:'Interview & Practical Test',desc:'Answer field-specific questions, record a 3–5 minute video introduction, and complete a practical case study.'},
              {n:'04',icon:'🏆',title:'Get Discovered by Companies',desc:'Your verified Tamayoz profile is visible to UAE companies searching for assessed, job-ready candidates.'},
            ].map((s,i)=>(
              <div key={s.n} className="bg-white rounded-2xl border border-gray-100 shadow-card p-7 relative hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-sm font-black text-white mb-5">{s.n}</div>
                {i < 3 && <div className="hidden md:block absolute top-[1.75rem] -right-2.5 text-gray-200 text-lg">›</div>}
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-sm text-primary mb-2">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest bg-accent/20 border border-accent/30 px-4 py-1.5 rounded-full">Platform Features</span>
            <h2 className="text-4xl font-black text-primary tracking-tight mt-5">Everything a talent assessment<br />platform should be</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {icon:'🤖',bg:'bg-yellow-50',title:'AI CV Analysis',desc:'Our AI parses your CV, extracts skills and experience, identifies gaps, and gives you a CV quality score with actionable suggestions.'},
              {icon:'🎥',bg:'bg-blue-50',title:'Video Interview',desc:'Record a 3–5 minute video introduction. Our AI evaluates communication clarity, confidence, structure, and professional presence.'},
              {icon:'🧪',bg:'bg-emerald-50',title:'Practical Tests',desc:'Real-world case studies tailored to your field. Accountants do aging reports. Marketers build campaign briefs. Developers code tasks.'},
              {icon:'📊',bg:'bg-purple-50',title:'Verified Score Report',desc:'Receive a comprehensive score across 6 dimensions: profile, CV, interview, practical test, portfolio, and hiring readiness.'},
              {icon:'🗂️',bg:'bg-orange-50',title:'Portfolio Builder',desc:'Automatically build a professional digital portfolio including your CV, video, case study, test results, badges, and certificates.'},
              {icon:'📈',bg:'bg-gray-50',title:'Development Roadmap',desc:'Get a personalized 30-day improvement plan with recommended courses, skill gaps to fill, and actions to reach Top Talent status.'},
            ].map(f=>(
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 shadow-card p-7 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className={`w-13 h-13 ${f.bg} rounded-xl flex items-center justify-center text-2xl mb-5`} style={{width:52,height:52}}>{f.icon}</div>
                <h3 className="font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE ── */}
      <section id="candidates" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-muted uppercase tracking-widest bg-surface border border-gray-200 px-4 py-1.5 rounded-full">Who It's For</span>
            <h2 className="text-4xl font-black text-primary tracking-tight mt-5">Built for talents. Trusted by companies.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5" id="companies">
            {/* Candidates */}
            <div className="bg-primary rounded-3xl p-10">
              <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">👤 For Candidates</div>
              <h3 className="text-2xl font-black text-white mb-3">Prove your skills,<br />land your opportunity.</h3>
              <p className="text-white/55 text-sm mb-7 leading-relaxed">Stop letting a weak CV hold you back. Build a verified profile that shows employers exactly what you can do.</p>
              <ul className="space-y-2.5 mb-8">
                {['AI-powered CV analysis & optimization','Video interview evaluation & feedback','Field-specific practical assessment','Verified portfolio & digital badge','Personalized development roadmap','Direct visibility to 300+ UAE companies'].map(item=>(
                  <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-white/80">
                    <span className="text-accent font-black mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('wizard')} className="flex items-center gap-2 bg-accent text-primary font-black text-sm px-6 py-3 rounded-xl hover:bg-accent-hover transition-all">Start for Free →</button>
            </div>
            {/* Companies */}
            <div className="bg-accent rounded-3xl p-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 text-primary text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">🏢 For Companies</div>
              <h3 className="text-2xl font-black text-primary mb-3">Hire smarter,<br />faster, with confidence.</h3>
              <p className="text-primary/60 text-sm mb-7 leading-relaxed">Stop wasting time on unqualified CVs. Access pre-assessed, verified candidates ranked by hiring readiness score.</p>
              <ul className="space-y-2.5 mb-8">
                {['Search pre-assessed verified candidates','Filter by score, field, city & salary range','View full portfolio, video & test results','AI-powered candidate shortlist service','Organization structure consulting','Salary benchmarking & JD writing'].map(item=>(
                  <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-primary">
                    <span className="font-black mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('wizard')} className="flex items-center gap-2 bg-primary text-white font-black text-sm px-6 py-3 rounded-xl hover:bg-primary-hover transition-all shadow-primary">Post a Vacancy →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALIZATIONS ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest bg-accent/20 border border-accent/30 px-4 py-1.5 rounded-full">Specializations</span>
            <h2 className="text-4xl font-black text-primary tracking-tight mt-5">Assessment for every<br />UAE job market category</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {icon:'💻',name:'IT & Development',desc:'Web, app, cloud & support'},
              {icon:'📊',name:'Digital Marketing',desc:'Social, SEO, paid ads & campaigns'},
              {icon:'🧾',name:'Accounting & Finance',desc:'Audit, VAT, ERP & bookkeeping'},
              {icon:'🎨',name:'Graphic Design',desc:'Brand, UI/UX & visual identity'},
              {icon:'✍️',name:'Content Creation',desc:'Scripts, reels, copy & strategy'},
              {icon:'📈',name:'Sales & Business Dev',desc:'B2B, retail & business growth'},
            ].map(f=>(
              <div key={f.name} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="w-13 h-13 bg-surface rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{width:52,height:52}}>{f.icon}</div>
                <div>
                  <div className="font-bold text-sm text-primary">{f.name}</div>
                  <div className="text-xs text-muted mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/8 border border-white/12 px-4 py-1.5 rounded-full">Success Stories</span>
            <h2 className="text-4xl font-black text-white tracking-tight mt-5">Thousands of talents<br />already stand out</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {text:'"After 6 months of job searching with no results, I joined Tamayoz, built my verified profile in 3 days, and had 4 company interview requests within a week."',name:'Sara Al Amri',role:'Digital Marketing · Dubai',emoji:'👩‍💼',bg:'bg-accent/20'},
              {text:'"As an HR manager, Tamayoz saved us 60% of our screening time. Every candidate we see has already been assessed and verified. We hired 3 developers in 2 weeks."',name:'Khaled Al Rashidi',role:'HR Director · Abu Dhabi',emoji:'👨‍💼',bg:'bg-blue-500/20'},
              {text:'"The practical accounting test on Tamayoz was exactly what the job required. When I walked into the interview, they already knew my score. I got the offer the same day."',name:'Mohammed Hassan',role:'Senior Accountant · Sharjah',emoji:'👨‍🎓',bg:'bg-emerald-500/20'},
            ].map(t=>(
              <div key={t.name} className="bg-white/6 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <div className="text-accent text-sm tracking-widest mb-4">★★★★★</div>
                <p className="text-white/75 text-sm leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.bg} rounded-xl flex items-center justify-center text-base`}>{t.emoji}</div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.name}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-muted uppercase tracking-widest bg-surface border border-gray-200 px-4 py-1.5 rounded-full">Pricing</span>
            <h2 className="text-4xl font-black text-primary tracking-tight mt-5">Simple, transparent pricing</h2>
            <p className="text-muted mt-3">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {[
              {label:'Candidate',name:'Free',price:'AED 0',per:'forever',featured:false,
               features:['Full profile creation','AI CV analysis','Basic profile scoring','1 specialization','Company discovery visibility'],
               no:['Video interview','Practical test & portfolio'],
               cta:'Get Started Free',ctaStyle:'btn-outline'},
              {label:'Candidate Pro',name:'Pro',price:'AED 99',per:'/month',featured:true,
               features:['Everything in Free','Video interview & AI evaluation','Practical test & case study','Full portfolio builder','Advanced scoring (6 dimensions)','Development roadmap','Priority company visibility'],
               no:[],
               cta:'Start Pro Trial',ctaStyle:'btn-accent'},
              {label:'Company',name:'Business',price:'AED 499',per:'/month',featured:false,
               features:['Search 5,000+ assessed candidates','Advanced filters & AI matching','View portfolios, videos & scores','10 contact requests/month','Company profile page','Candidate shortlist service'],
               no:['HR consulting'],
               cta:'Post a Vacancy',ctaStyle:'btn-primary'},
            ].map(p=>(
              <div key={p.name} className={`rounded-2xl p-8 border relative transition-all duration-300 ${p.featured ? 'bg-primary border-primary text-white -translate-y-2 shadow-2xl' : 'bg-white border-gray-100 shadow-card'}`}>
                {p.featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-primary text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full">Most Popular</div>}
                <div className={`text-[10px] font-black uppercase tracking-wider mb-3 ${p.featured ? 'text-accent' : 'text-muted'}`}>{p.label}</div>
                <div className={`text-xl font-black mb-1 ${p.featured ? 'text-white' : 'text-primary'}`}>{p.name}</div>
                <div className={`text-4xl font-black tracking-tight mb-1 ${p.featured ? 'text-white' : 'text-primary'}`}>{p.price}</div>
                <div className={`text-xs font-semibold mb-6 ${p.featured ? 'text-white/40' : 'text-muted'}`}>{p.per}</div>
                <div className={`h-px mb-6 ${p.featured ? 'bg-white/10' : 'bg-gray-100'}`} />
                <ul className="space-y-2.5 mb-8">
                  {p.features.map(f=>(
                    <li key={f} className={`flex items-start gap-2 text-xs font-medium ${p.featured ? 'text-white/80' : 'text-muted'}`}>
                      <span className="text-emerald-500 font-black mt-0.5">✓</span>{f}
                    </li>
                  ))}
                  {p.no.map(f=>(
                    <li key={f} className="flex items-start gap-2 text-xs font-medium text-gray-300">
                      <span className="font-black mt-0.5">—</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => onNavigate('wizard')} className={`w-full justify-center text-sm py-3 rounded-xl font-black transition-all ${p.featured ? 'bg-accent text-primary hover:bg-accent-hover' : p.ctaStyle === 'btn-primary' ? 'bg-primary text-white hover:bg-primary-hover' : 'border border-gray-200 text-primary hover:bg-surface'}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-muted uppercase tracking-widest bg-white border border-gray-200 px-4 py-1.5 rounded-full">FAQ</span>
            <h2 className="text-4xl font-black text-primary tracking-tight mt-5">Frequently asked questions</h2>
          </div>
          <div className="max-w-2xl mx-auto divide-y divide-gray-200 border-y border-gray-200">
            {[
              {q:'Is Tamayoz free to use for candidates?',a:'Yes! Candidates can create a full profile, upload their CV, get AI analysis, and be visible to companies completely free. Our Pro plan adds video interviews, practical tests, and a full portfolio builder for AED 99/month.'},
              {q:'How does the AI assessment work?',a:'Our AI analyzes your CV, evaluates your written cover letter, scores your video interview based on clarity and communication, assesses your practical test against field benchmarks, and combines everything into a Hiring Readiness Score (0–100).'},
              {q:'Can I control who sees my profile?',a:'Absolutely. You have full control — Public (all verified companies), Listed (companies you apply to), or Private (only you). You can also hide your video separately.'},
              {q:'What kind of companies use Tamayoz?',a:'SMEs, startups, marketing agencies, retail companies, restaurants, real estate firms, tech companies, and large enterprises across the UAE. All companies are verified before they can contact candidates.'},
              {q:'How long does the full assessment take?',a:'Most candidates complete the full profile in 1–2 hours. CV analysis takes 5 minutes, cover letter 15–20 minutes, video intro 3–5 minutes, and the practical test is typically 30–60 minutes.'},
              {q:'Is Tamayoz available in Arabic?',a:'Yes. Tamayoz supports both English and Arabic throughout the platform. Interview questions, scoring rubrics, and reports are available in both languages.'},
            ].map((item,i)=>(
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left font-bold text-primary text-sm hover:text-muted transition-colors gap-4 bg-transparent border-none">
                  {item.q}
                  <span className={`text-muted text-lg flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-sm text-muted leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-accent rounded-4xl p-16 text-center relative overflow-hidden" style={{borderRadius:28}}>
            <div className="absolute inset-0 opacity-8" style={{backgroundImage:'radial-gradient(circle, #252C37 1px, transparent 1px)',backgroundSize:'28px 28px'}} />
            <div className="relative">
              <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest bg-primary/10 border border-primary/15 px-4 py-1.5 rounded-full">تميّز · Stand Out Today</span>
              <h2 className="text-4xl font-black text-primary tracking-tight mt-6 mb-4">Ready to prove your skills<br />and get hired in the UAE?</h2>
              <p className="text-primary/60 max-w-md mx-auto mb-8 text-base leading-relaxed">Join 5,000+ assessed UAE talents. Build your verified profile in under 2 hours and start getting discovered.</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button onClick={() => onNavigate('wizard')} className="flex items-center gap-2 bg-primary text-white font-black text-base px-8 py-3.5 rounded-2xl hover:bg-primary-hover transition-all shadow-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  Build My Tamayoz Profile — Free
                </button>
                <button onClick={() => onNavigate('wizard')} className="flex items-center gap-2 bg-white text-primary font-black text-base px-8 py-3.5 rounded-2xl border border-primary/15 hover:bg-surface transition-all">
                  I'm a Company →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary pt-16 pb-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/8">
            <div>
              <Logo dark size={38} />
              <p className="text-white/45 text-sm mt-4 leading-relaxed max-w-xs">AI-powered talent assessment and hiring intelligence platform for the UAE & GCC market.</p>
              <div className="flex gap-2.5 mt-5">
                {['🔗','🐦','📸','▶️'].map((icon,i)=>(
                  <div key={i} className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center text-sm cursor-pointer hover:bg-accent transition-colors">{icon}</div>
                ))}
              </div>
              <div className="mt-5 bg-accent/10 border border-accent/20 rounded-xl p-4 text-xs text-white/60 leading-relaxed">
                <span className="text-accent font-bold">📍 UAE Headquarters</span><br />
                Business Bay, Dubai, UAE<br />
                hello@tamayoz.ae
              </div>
            </div>
            {[
              {title:'Platform',links:['How It Works','AI Assessment','Video Interview','Portfolio Builder','Score Report','Training & Courses']},
              {title:'Company',links:['About Tamayoz','Pricing','Blog','Careers','Press','Contact Us']},
              {title:'Support',links:['Help Center','Privacy Policy','Terms of Service','Cookie Policy','For Companies','API Docs']},
            ].map(col=>(
              <div key={col.title}>
                <h4 className="text-[10px] font-black text-white/35 uppercase tracking-widest mb-5">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link=>(
                    <li key={link}><a href="#" className="text-sm text-white/55 hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between py-6 gap-4 text-[11px] text-white/30 font-semibold">
            <span>© 2025 Tamayoz — تميّز. All rights reserved. Made with ❤️ for the UAE & GCC.</span>
            <div className="flex gap-5">
              {['Privacy','Terms','Cookies'].map(x=>(
                <a key={x} href="#" className="hover:text-white/60 transition-colors">{x}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
