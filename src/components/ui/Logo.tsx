interface LogoProps {
  size?: number
  dark?: boolean
  showArabic?: boolean
}

export function Logo({ size = 38, dark = false, showArabic = true }: LogoProps) {
  const textColor = dark ? 'text-white' : 'text-primary'
  const subColor  = dark ? 'text-white/50' : 'text-muted'

  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="9" fill="#252C37" />
        <polygon
          points="18,5 20.5,13 28.5,13 22,17.5 24.5,26 18,21 11.5,26 14,17.5 7.5,13 15.5,13"
          fill="#F8C61E"
        />
        <polyline
          points="14,18 17,22.5 23.5,14.5"
          stroke="#252C37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div>
        <div className={`font-black tracking-tight leading-none ${textColor}`} style={{ fontSize: size * 0.48 }}>
          Tamayoz
        </div>
        {showArabic && (
          <div className={`font-medium leading-none mt-0.5 ${subColor}`} style={{ fontSize: size * 0.27 }}>
            تميّز
          </div>
        )}
      </div>
    </div>
  )
}
