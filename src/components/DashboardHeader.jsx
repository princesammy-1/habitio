import { FiBell } from 'react-icons/fi'

export default function DashboardHeader({ name = 'Alex', streak = 12, avatar = 'A' }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #8B5CF6 0%, #A78BFA 40%, #DDD6FE 100%)',
      borderRadius: '0 0 32px 32px',
      padding: '48px 20px 80px',
      position: 'relative',
      marginTop: -20,
      marginLeft: -20,
      marginRight: -20,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, color: '#fff',
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          {avatar}
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 100,
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff', fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 16 }}>🔥</span>
          {streak} day streak
        </div>
        <button style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.3)',
          color: '#fff', fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(8px)',
        }}>
          <FiBell />
        </button>
      </div>

      <div style={{ color: '#fff' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
          Good morning, {name}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4, fontWeight: 500 }}>
          You have 4 habits to complete today
        </p>
      </div>
    </div>
  )
}
