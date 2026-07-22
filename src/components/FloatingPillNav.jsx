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
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
    }}>
      <div style={{
        background: '#18181B',
        borderRadius: 9999,
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}>
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
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '6px 14px',
                borderRadius: 9999,
                border: 'none',
                background: isActive ? '#fff' : 'transparent',
                color: isActive ? '#7C3AED' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: 56,
              }}
            >
              {tab.icon}
              {tab.label && (
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  lineHeight: 1,
                }}>
                  {tab.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
