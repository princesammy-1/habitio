import { FiSunrise, FiSun, FiMoon, FiArchive } from "react-icons/fi";

const SLOT_LABELS = {
  dawn: "00:00-05:59",
  morning: "06:00-11:59",
  afternoon: "12:00-17:59",
  evening: "18:00-23:59",
};

export default function TimeFilter({ value, onChange }) {
  const filters = [
    { value: "all", label: "All" },
    { value: "dawn", label: `Dawn ${SLOT_LABELS.dawn}` },
    { value: "morning", label: `Morning ${SLOT_LABELS.morning}` },
    { value: "afternoon", label: `Afternoon ${SLOT_LABELS.afternoon}` },
    { value: "evening", label: `Evening ${SLOT_LABELS.evening}` },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="time-filter">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="time-filter-select"
      >
        {filters.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
