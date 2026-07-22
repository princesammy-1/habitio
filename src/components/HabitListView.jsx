import { FiChevronRight, FiDroplet, FiSun, FiBookOpen, FiHeart } from 'react-icons/fi'

const habits = [
  { name: 'Drink Water', progress: 75, icon: <FiDroplet size={20} />, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', target: '8 glasses' },
  { name: 'Morning Meditation', progress: 100, icon: <FiSun size={20} />, color: '#F97316', bg: 'rgba(249,115,22,0.1)', target: '10 min' },
  { name: 'Read 20 Pages', progress: 40, icon: <FiBookOpen size={20} />, color: '#EF4444', bg: 'rgba(239,68,68,0.1)', target: '20 pages' },
  { name: 'Exercise', progress: 60, icon: <FiHeart size={20} />, color: '#10B981', bg: 'rgba(16,185,129,0.1)', target: '30 min' },
]

export default function HabitListView() {
  return (
    <div className="habit-list-section">
      <div className="habit-list-header">
        <h2>Today's Habits</h2>
        <button>See All</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {habits.map((h, i) => (
          <div key={i} className="habit-row">
            <div className="habit-row-icon" style={{ background: h.bg, color: h.color }}>
              {h.icon}
            </div>

            <div className="habit-row-body">
              <div className="habit-row-top">
                <span className="habit-row-name">{h.name}</span>
                <span className="habit-row-target">{h.target}</span>
              </div>
              <div className="habit-row-progress">
                <div
                  className="habit-row-fill"
                  style={{
                    width: `${h.progress}%`,
                    background: `linear-gradient(90deg, ${h.color}, ${h.color}dd)`,
                  }}
                />
              </div>
            </div>

            <FiChevronRight size={18} className="habit-row-arrow" />
          </div>
        ))}
      </div>
    </div>
  )
}
