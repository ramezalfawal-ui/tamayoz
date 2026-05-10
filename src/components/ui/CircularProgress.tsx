interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = '#F8C61E',
  label = 'Complete',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="#F2F4F7" strokeWidth={strokeWidth} fill="none"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-primary">{percentage}%</span>
        {label && (
          <span className="text-[9px] font-bold text-muted uppercase tracking-wider mt-0.5">{label}</span>
        )}
      </div>
    </div>
  )
}
