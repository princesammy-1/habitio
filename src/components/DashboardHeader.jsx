import { FiBell } from 'react-icons/fi'

export default function DashboardHeader({ name = 'Alex', streak = 12, avatar = 'A' }) {
  return (
    <header className="header-section">
      <div className="header-top">
        <div className="header-avatar">{avatar}</div>
        <div className="header-streak">
          <span style={{ fontSize: 16 }}>🔥</span>
          {streak} day streak
        </div>
        <button className="header-icon-btn">
          <FiBell />
        </button>
      </div>
      <h1 className="header-title">Good morning, {name}</h1>
      <p className="header-subtitle">You have 4 habits to complete today</p>
    </header>
  )
}
