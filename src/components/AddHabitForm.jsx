import { useState, useRef, useEffect } from "react";
import { FiPlus, FiCheck, FiX } from "react-icons/fi";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AddHabitForm({ onAdd }) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [cadence, setCadence] = useState("daily");
  const [timesPerWeek, setTimesPerWeek] = useState(3);
  const [customDays, setCustomDays] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState("any");
  const inputRef = useRef(null);

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    let cadenceObj = { type: cadence };
    if (cadence === "weekly") cadenceObj.timesPerWeek = timesPerWeek;
    if (cadence === "custom") cadenceObj.daysOfWeek = customDays;

    onAdd(trimmed, cadenceObj, timeOfDay);
    setName("");
    setExpanded(false);
    setCadence("daily");
    setCustomDays([]);
  }

  function toggleCustomDay(d) {
    setCustomDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );
  }

  return (
    <div className="add-habit-wrap">
      {!expanded ? (
        <button className="add-trigger" onClick={() => setExpanded(true)}>
          <FiPlus /> New Habit
        </button>
      ) : (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="What habit do you want to build?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />

          <div className="form-group">
            <label>Schedule</label>
            <div className="cadence-options">
              {["daily", "weekdays", "weekends", "weekly", "custom"].map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    className={`pill ${cadence === t ? "active" : ""}`}
                    onClick={() => setCadence(t)}
                  >
                    {t === "daily"
                      ? "Daily"
                      : t === "weekdays"
                        ? "Weekdays"
                        : t === "weekends"
                          ? "Weekends"
                          : t === "weekly"
                            ? "X/Week"
                            : "Custom"}
                  </button>
                ),
              )}
            </div>
          </div>

          {cadence === "weekly" && (
            <div className="form-group">
              <label>Times per week</label>
              <div className="cadence-options">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`pill ${timesPerWeek === n ? "active" : ""}`}
                    onClick={() => setTimesPerWeek(n)}
                  >
                    {n}x
                  </button>
                ))}
              </div>
            </div>
          )}

          {cadence === "custom" && (
            <div className="form-group">
              <label>Days of week</label>
              <div className="cadence-options">
                {DAYS.map((d, i) => (
                  <button
                    key={d}
                    type="button"
                    className={`pill ${customDays.includes(i) ? "active" : ""}`}
                    onClick={() => toggleCustomDay(i)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Time of day</label>
            <div className="cadence-options">
              {[
                { value: "any", label: "Any" },
                { value: "morning", label: "Morning" },
                { value: "afternoon", label: "Afternoon" },
                { value: "evening", label: "Evening" },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`pill ${timeOfDay === t.value ? "active" : ""}`}
                  onClick={() => setTimeOfDay(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <FiCheck /> Add Habit
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setExpanded(false)}
            >
              <FiX /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
