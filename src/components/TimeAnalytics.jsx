import { useState } from "react";
import { FiSunrise, FiSun, FiMoon } from "react-icons/fi";
import { today, calcRollingConsistency, getSlotFromExact, SLOT_RANGES } from "../utils/helpers";

const SlotIcon = ({ slot }) => {
  if (slot === "afternoon") return <FiSun />;
  if (slot === "evening") return <FiMoon />;
  return <FiSunrise />;
};

export default function TimeAnalytics({ habits }) {
  const [collapsed, setCollapsed] = useState(true);

  const active = habits.filter((h) => !h.archived);
  const todayStr = today();

  const groups = { dawn: [], morning: [], afternoon: [], evening: [] };
  active.forEach((h) => {
    if (!h.timeOfDay) return;
    const slot = getSlotFromExact(h.timeOfDay);
    if (slot && groups[slot]) groups[slot].push(h);
  });

  const timeSlots = ["dawn", "morning", "afternoon", "evening"];
  const slotLabel = { dawn: "Dawn", morning: "Morning", afternoon: "Afternoon", evening: "Evening" };
  const slotRange = {};
  SLOT_RANGES.forEach(s => { slotRange[s.id] = `${String(s.start).padStart(2, "0")}:00-${String(s.end).padStart(2, "0")}:59`; });

  const stats = timeSlots.map((slot) => {
    const habitsInSlot = groups[slot];
    const total = habitsInSlot.length;
    const done = habitsInSlot.filter(
      (h) => h.logs?.[todayStr] === "done",
    ).length;
    const rate = total > 0 ? Math.round((done / total) * 100) : 0;
    const avgConsistency =
      habitsInSlot.length > 0
        ? Math.round(
            habitsInSlot.reduce((s, h) => s + calcRollingConsistency(h), 0) /
              habitsInSlot.length,
          )
        : 0;
    return { slot, total, done, rate, avgConsistency };
  });

  return (
    <div className="analytics-wrap">
      <button
        className="section-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>{collapsed ? "▶" : "▼"}</span> Time-of-Day Patterns
      </button>
      {!collapsed && (
        <div className="analytics-grid">
          {stats
            .filter((s) => s.total > 0)
            .map((s) => (
              <div key={s.slot} className="analytics-card">
                <div className="analytics-header"><SlotIcon slot={s.slot} /> {slotLabel[s.slot]} {slotRange[s.slot]}</div>
                <div className="analytics-stat">
                  <span className="analytics-value">{s.rate}%</span>
                  <span className="analytics-label">today</span>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${s.rate >= 80 ? "high" : s.rate >= 50 ? "mid" : "low"}`}
                    style={{ width: `${s.rate}%` }}
                  />
                </div>
                <div className="analytics-stat small">
                  <span className="analytics-value">{s.avgConsistency}%</span>
                  <span className="analytics-label">avg 30d</span>
                </div>
                <div className="analytics-sub">
                  {s.done}/{s.total} habits done
                </div>
              </div>
            ))}
          {stats.every((s) => s.total === 0) && (
            <div className="empty" style={{ gridColumn: "1 / -1" }}>
              <p>Set a time of day on your habits to see patterns here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
