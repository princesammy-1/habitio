import { today, calcRollingConsistency } from '../utils/helpers';

export default function StatsBar({ habits }) {
  const todayStr = today();
  const total = habits.filter(h => !h.archived).length;
  const done = habits.filter(h => !h.archived && h.logs?.[todayStr] === 'done').length;
  const skipped = habits.filter(h => !h.archived && h.logs?.[todayStr] === 'skip').length;
  const pending = total - done - skipped;

  const avgConsistency = habits.filter(h => !h.archived).reduce((sum, h) => {
    return sum + calcRollingConsistency(h);
  }, 0);
  const avgRate = total > 0 ? Math.round(avgConsistency / total) : 0;

  const totalSkipTokens = habits.filter(h => !h.archived).reduce((sum, h) => {
    return sum + (h.skipTokens?.limit || 2);
  }, 0);
  const usedSkipTokens = habits.filter(h => !h.archived).reduce((sum, h) => {
    const m = new Date();
    const month = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
    if (h.skipTokens?.month === month) return sum + (h.skipTokens?.used || 0);
    return sum;
  }, 0);

  return (
    <div className="stats-bar">
      <div className="stat">
        <div className="value">{total}</div>
        <div className="label">Habits</div>
      </div>
      <div className="stat done-stat">
        <div className="value">{done}</div>
        <div className="label">Done</div>
      </div>
      {skipped > 0 && (
        <div className="stat skip-stat">
          <div className="value">{skipped}</div>
          <div className="label">Skipped</div>
        </div>
      )}
      <div className="stat">
        <div className="value">{pending}</div>
        <div className="label">Pending</div>
      </div>
      <div className="stat">
        <div className="value">{avgRate}%</div>
        <div className="label">Avg 30d</div>
      </div>
      <div className="stat">
        <div className="value">{totalSkipTokens - usedSkipTokens}</div>
        <div className="label">Tokens Left</div>
      </div>
    </div>
  );
}
