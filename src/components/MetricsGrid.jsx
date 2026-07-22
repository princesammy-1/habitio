import { FiZap, FiTrendingUp, FiCalendar, FiAward } from 'react-icons/fi'

const palette = {
  blue: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  orange: { color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
  red: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  green: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
}

const metrics = [
  { label: 'Best Streak', value: '21 days', sub: 'Personal record', ...palette.blue, icon: <FiZap size={20} /> },
  { label: 'Avg. Completion', value: '85%', sub: 'Last 30 days', ...palette.orange, icon: <FiTrendingUp size={20} /> },
  { label: 'This Week', value: '32 / 42', sub: 'Habits logged', ...palette.red, icon: <FiCalendar size={20} /> },
  { label: 'Badges Earned', value: '8', sub: 'Keep going!', ...palette.green, icon: <FiAward size={20} /> },
]

export default function MetricsGrid() {
  return (
    <div className="metrics-grid">
      {metrics.map((m, i) => (
        <div key={i} className="card metric-card">
          <div className="metric-icon" style={{ background: m.bg, color: m.color }}>
            {m.icon}
          </div>
          <div className="metric-val">{m.value}</div>
          <div className="metric-label">{m.label}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{m.sub}</div>
        </div>
      ))}
    </div>
  )
}
