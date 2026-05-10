import { Check } from 'lucide-react'
import { Logo } from './ui/Logo'
import { WIZARD_STEPS } from '../constants'

interface WizardLayoutProps {
  currentStep: number
  children: React.ReactNode
}

export function WizardLayout({ currentStep, children }: WizardLayoutProps) {
  const showStepper = currentStep > 0 && currentStep < 7

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo />
          {currentStep > 0 && (
            <div className="flex items-center gap-3 text-sm font-semibold text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Candidate Hub
            </div>
          )}
        </div>
      </header>

      {/* Stepper */}
      {showStepper && (
        <div className="bg-white border-b border-gray-100 px-6 py-5">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex justify-between items-start">
              {/* Track */}
              <div className="absolute top-[18px] left-[5%] right-[5%] h-0.5 bg-gray-100 -z-0" />
              <div
                className="absolute top-[18px] left-[5%] h-0.5 bg-emerald-500 -z-0 transition-all duration-700"
                style={{ width: `${Math.min(((currentStep - 1) / 5) * 90, 90)}%` }}
              />

              {WIZARD_STEPS.slice(0, 6).map((step, idx) => {
                const isActive   = currentStep === idx + 1
                const isComplete = currentStep > idx + 1
                return (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <div className={`step-dot ${isActive ? 'step-active' : isComplete ? 'step-done' : 'step-inactive'}`}>
                      {isComplete ? <Check className="w-4 h-4" strokeWidth={3} /> : idx + 1}
                    </div>
                    <span className={`mt-2 text-[9px] uppercase tracking-widest font-black ${
                      isActive ? 'text-primary' : isComplete ? 'text-emerald-500' : 'text-gray-300'
                    }`}>{step}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 animate-fade-up">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          <span>© 2025 Tamayoz — تميّز · UAE</span>
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Help'].map(x => (
              <button key={x} className="hover:text-muted transition-colors">{x}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
