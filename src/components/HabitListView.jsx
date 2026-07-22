import { FiChevronRight, FiDroplet, FiSun, FiBookOpen, FiHeart } from 'react-icons/fi'

const habits = [
  { name: 'Drink Water', progress: 75, icon: <FiDroplet size={20} />, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', target: '8 glasses' },
  { name: 'Morning Meditation', progress: 100, icon: <FiSun size={20} />, color: '#F97316', bg: 'rgba(249,115,22,0.1)', target: '10 min' },
  { name: 'Read 20 Pages', progress: 40, icon: <FiBookOpen size={20} />, color: '#EF4444', bg: 'rgba(239,68,68,0.1)', target: '20 pages' },
  { name: 'Exercise', progress: 60, icon: <FiHeart size={20} />, color: '#10B981', bg: 'rgba(16,185,129,0.1)', target: '30 min' },
]

export default function HabitListView() {
  return (
    <div style={{ padding: '0 20px', marginTop: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1F2937', margin: 0 }}>Today's Habits</h2>
        <button style={{
          background: 'none', border: 'none', color: '#3B82F6', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>See All</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {habits.map((h, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: h.bg,
              color: h.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {h.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{h.name}</span>
                <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{h.target}</span>
              </div>
              <div style={{
                height: 6,
                background: '#F3F4F6',
                borderRadius: 100,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${h.progress}%`,
                  background: `linear-gradient(90deg, ${h.color}, ${h.color}dd)`,
                  borderRadius: 100,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>

            <FiChevronRight size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
