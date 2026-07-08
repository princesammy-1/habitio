import { pastDays, dayOfWeek, today, isExpectedDay } from '../utils/helpers';

export default function WeekView({ habits }) {
  const days = pastDays(7);

  return (
    <div className="week-view">
      <h3>This Week</h3>
      <div className="week-grid">
        {days.map(dayStr => {
          let doneCount = 0;
          let totalCount = 0;
          habits.filter(h => !h.archived).forEach(h => {
            if (isExpectedDay(h.cadence, dayStr)) {
              totalCount++;
              if (h.logs?.[dayStr] === 'done') doneCount++;
            }
          });

          let cls = 'week-cell';
          if (dayStr === today()) cls += ' today';
          if (totalCount > 0 && doneCount === totalCount) cls += ' complete';
          else if (doneCount > 0) cls += ' partial';
          else cls += ' empty-state';

          const label = dayOfWeek(dayStr);
          const dayNum = dayStr.split('-')[2];
          return (
            <div key={dayStr} className={cls}>
              <span className="day-label">{label}</span>
              <span>{dayNum}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
