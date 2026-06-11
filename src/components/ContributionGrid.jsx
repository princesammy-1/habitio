import { useState, useMemo } from 'react';
import { pastDays, getMonthName } from '../utils/helpers';

export default function ContributionGrid({ habits }) {
  const [collapsed, setCollapsed] = useState(true);
  const days = pastDays(365);

  function getDayIntensity(dayStr) {
    let done = 0;
    let total = 0;
    habits.filter(h => !h.archived).forEach(h => {
      total++;
      if (h.logs?.[dayStr] === 'done') done++;
    });
    if (total === 0 || done === 0) return 0;
    const ratio = done / total;
    if (ratio >= 0.75) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.25) return 2;
    return 1;
  }

  const levels = ['', 'low', 'medium', 'high', 'max'];

  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [days]);

  const months = useMemo(() => {
    const result = [];
    const seen = new Set();
    weeks.forEach((week, wi) => {
      const firstDay = week[0];
      if (firstDay) {
        const m = getMonthName(firstDay);
        if (!seen.has(m)) {
          seen.add(m);
          const nextIdx = weeks.slice(wi + 1).findIndex(w => {
            const fd = w[0];
            return fd && getMonthName(fd) !== m;
          });
          const span = nextIdx !== -1 ? nextIdx + 1 : weeks.length - wi;
          result.push({ label: m, start: wi, span });
        }
      }
    });
    return result;
  }, [weeks]);

  return (
    <div className="contribution-wrap">
      <button className="section-toggle" onClick={() => setCollapsed(!collapsed)}>
        <span>{collapsed ? '▶' : '▼'}</span> Year at a Glance
      </button>
      {!collapsed && (
        <div className="contribution-grid">
          <div className="grid-inner">
            <div className="month-row">
              <div className="corner-spacer" />
              {months.map(m => (
                <div
                  key={m.label}
                  className="month-label"
                  style={{ gridColumn: `${m.start + 2} / span ${m.span}` }}
                >
                  {m.label}
                </div>
              ))}
            </div>
            <div className="body-row">
              <div className="day-labels-col">
                {['Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                  <span key={i} className="day-label-side">{d}</span>
                ))}
              </div>
              <div className="week-columns">
                {weeks.map((week, wi) => (
                  <div key={wi} className="week-col">
                    {week.map(dayStr => (
                      <div
                        key={dayStr}
                        className={`cell ${levels[getDayIntensity(dayStr)]}`}
                        title={`${dayStr}: ${getDayIntensity(dayStr) > 0 ? 'completed' : 'no activity'}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map(l => (
              <div key={l} className={`cell ${levels[l]}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
}
