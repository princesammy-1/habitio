import { useState } from 'react'
import { FiHome, FiBarChart2, FiPlus, FiCheckSquare, FiUser } from 'react-icons/fi'

const tabs = [
  { key: 'home', label: 'Home', icon: <FiHome size={20} /> },
  { key: 'stats', label: 'Stats', icon: <FiBarChart2 size={20} /> },
  { key: 'add', label: '', icon: <FiPlus size={24} />, center: true },
  { key: 'habits', label: 'Habits', icon: <FiCheckSquare size={20} /> },
  { key: 'profile', label: 'Profile', icon: <FiUser size={20} /> },
]

export default function FloatingPillNav() {
  const [active, setActive] = useState('home')

  return (
    <nav className="floating-nav">
      {tabs.map((tab) => {
        const isActive = active === tab.key

        if (tab.center) {
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 4px',
                boxShadow: '0 4px 16px rgba(139,92,246,0.3)',
                flexShrink: 0,
              }}
            >
              {tab.icon}
            </button>
          )
        }

        return (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`nav-item${isActive ? ' active' : ''}`}
          >
            {tab.icon}
            {tab.label && <span style={{ fontSize: 10, lineHeight: 1 }}>{tab.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}
