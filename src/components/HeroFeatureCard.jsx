export default function HeroFeatureCard({
  completed = 5,
  total = 9,
  progress = 72,
}) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (progress / 100) * circumference
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div style={{
      background: '#fff',
      borderRadius: 24,
      padding: '20px 24px',
      marginTop: -40,
      marginLeft: 20,
      marginRight: 20,
      boxShadow: '0 8px 32px rgba(139,92,246,0.08)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
    }}>
      <div>
        <p style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, margin: '0 0 4px' }}>
          Today's Progress
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: '#1F2937', lineHeight: 1 }}>
            {completed}
          </span>
          <span style={{ fontSize: 16, color: '#9CA3AF', fontWeight: 600 }}>
            / {total}
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#10B981', fontWeight: 600, marginTop: 4 }}>
          {pct}% completed
        </p>
      </div>

      <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute' }}>
          <circle cx="60" cy="60" r="54" fill="none" stroke="#F3F4F6" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="url(#heroGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(139,92,246,0.25))', transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#1F2937', lineHeight: 1.2 }}>
            {progress}%
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>overall</div>
        </div>
      </div>
    </div>
  )
}
