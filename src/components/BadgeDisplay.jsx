import { useState } from 'react';
import { checkBadges, getAllBadges } from '../utils/badges';

export default function BadgeDisplay({ habits }) {
  const [collapsed, setCollapsed] = useState(true);

  const allEarned = new Set();
  habits.filter(h => !h.archived).forEach(h => {
    checkBadges(h).forEach(b => allEarned.add(b.id));
  });

  const allBadges = getAllBadges();
  const earnedList = allBadges.filter(b => allEarned.has(b.id));
  const lockedList = allBadges.filter(b => !allEarned.has(b.id));

  return (
    <div className="badge-wrap">
      <button className="section-toggle" onClick={() => setCollapsed(!collapsed)}>
        <span>{collapsed ? '▶' : '▼'}</span> Badges ({earnedList.length}/{allBadges.length})
      </button>
      {!collapsed && (
        <div className="badge-grid">
          {earnedList.map(b => (
            <div key={b.id} className="badge earned" title={b.desc}>
              <span className="badge-icon">{b.icon}</span>
              <span className="badge-label">{b.label}</span>
            </div>
          ))}
          {lockedList.map(b => (
            <div key={b.id} className="badge locked" title={b.desc}>
              <span className="badge-icon">🔒</span>
              <span className="badge-label">{b.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
