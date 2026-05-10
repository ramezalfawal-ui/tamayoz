interface LogoProps {
  size?: number
  dark?: boolean
  showArabic?: boolean
  showTagline?: boolean
}

export function Logo({ size = 38, dark = false, showArabic = true, showTagline = false }: LogoProps) {
  const textColor = dark ? 'white' : '#252C37'
  const subColor  = dark ? 'rgba(255,255,255,0.4)' : '#6B7280'
  const tagColor  = dark ? 'rgba(255,255,255,0.3)' : '#9ca3af'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="48" height="48" rx="11" fill="#252C37"/>
        <line x1="24" y1="6"  x2="9"  y2="15" stroke="#F8C61E" strokeWidth="1"   opacity="0.35"/>
        <line x1="24" y1="6"  x2="39" y2="15" stroke="#F8C61E" strokeWidth="1"   opacity="0.35"/>
        <line x1="9"  y1="15" x2="9"  y2="33" stroke="#F8C61E" strokeWidth="1"   opacity="0.35"/>
        <line x1="39" y1="15" x2="39" y2="33" stroke="#F8C61E" strokeWidth="1"   opacity="0.35"/>
        <line x1="9"  y1="33" x2="24" y2="42" stroke="#F8C61E" strokeWidth="1"   opacity="0.35"/>
        <line x1="39" y1="33" x2="24" y2="42" stroke="#F8C61E" strokeWidth="1"   opacity="0.35"/>
        <line x1="24" y1="6"  x2="24" y2="24" stroke="#F8C61E" strokeWidth="1"   opacity="0.2"/>
        <line x1="9"  y1="15" x2="24" y2="24" stroke="#F8C61E" strokeWidth="1"   opacity="0.2"/>
        <line x1="39" y1="15" x2="24" y2="24" stroke="#F8C61E" strokeWidth="1"   opacity="0.2"/>
        <line x1="9"  y1="33" x2="24" y2="24" stroke="#F8C61E" strokeWidth="1"   opacity="0.2"/>
        <line x1="39" y1="33" x2="24" y2="24" stroke="#F8C61E" strokeWidth="1"   opacity="0.2"/>
        <line x1="24" y1="42" x2="24" y2="24" stroke="#F8C61E" strokeWidth="1"   opacity="0.2"/>
        <circle cx="24" cy="6"  r="3.5" fill="#F8C61E"/>
        <circle cx="9"  cy="15" r="2.5" fill="#F8C61E" opacity="0.65"/>
        <circle cx="39" cy="15" r="2.5" fill="#F8C61E" opacity="0.65"/>
        <circle cx="9"  cy="33" r="2.5" fill="#F8C61E" opacity="0.65"/>
        <circle cx="39" cy="33" r="2.5" fill="#F8C61E" opacity="0.65"/>
        <circle cx="24" cy="42" r="3.5" fill="#F8C61E" opacity="0.65"/>
        <circle cx="24" cy="24" r="12"  fill="#F8C61E"/>
        <polyline points="17.5,24 21.5,28.5 30.5,18.5" stroke="#252C37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <div style={{ fontSize: size * 0.5, fontWeight: 900, color: textColor, letterSpacing: '-0.035em', lineHeight: 1.1 }}>
          Tamayoz
        </div>
        {showArabic && (
          <div style={{ fontSize: size * 0.26, color: subColor, fontWeight: 500, lineHeight: 1.1, marginTop: 1 }}>
            تميّز
          </div>
        )}
        {showTagline && (
          <div style={{ fontSize: size * 0.22, color: tagColor, fontWeight: 600, lineHeight: 1.2, marginTop: 2, letterSpacing: '0.03em' }}>
            AI Talent Assessment · UAE
          </div>
        )}
      </div>
    </div>
  )
}
