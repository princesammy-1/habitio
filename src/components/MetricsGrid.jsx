import { FiZap, FiTrendingUp, FiCalendar, FiAward } from 'react-icons/fi'

const metrics = [
  {
    label: 'Best Streak',
    value: '21 days',
    sub: 'Personal record',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.1)',
    icon: <FiZap size={20} />,
  },
  {
    label: 'Avg. Completion',
    value: '85%',
    sub: 'Last 30 days',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.1)',
    icon: <FiTrendingUp size={20} />,
  },
  {
    label: 'This Week',
    value: '32 / 42',
    sub: 'Habits logged',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.1)',
    icon: <FiCalendar size={20} />,
  },
  {
    label: 'Badges Earned',
    value: '8',
    sub: 'Keep going!',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    icon: <FiAward size={20} />,
  },
]

export default function MetricsGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      padding: '0 20px',
      marginTop: 20,
    }}>
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            borderRadius: 20,
            padding: 16,
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: m.bg,
            color: m.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}>
            {m.icon}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1F2937', lineHeight: 1.2 }}>
            {m.value}
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, marginTop: 2 }}>
            {m.label}
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
            {m.sub}
          </div>
        </div>
      ))}
    </div>
  )
}
