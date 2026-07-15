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
    {
      value: "dawn",
      label: (
        <>
          <FiSunrise /> {SLOT_LABELS.dawn}
        </>
      ),
    },
    {
      value: "morning",
      label: (
        <>
          <FiSunrise /> {SLOT_LABELS.morning}
        </>
      ),
    },
    {
      value: "afternoon",
      label: (
        <>
          <FiSun /> {SLOT_LABELS.afternoon}
        </>
      ),
    },
    {
      value: "evening",
      label: (
        <>
          <FiMoon /> {SLOT_LABELS.evening}
        </>
      ),
    },
    {
      value: "archived",
      label: (
        <>
          <FiArchive /> Archived
        </>
      ),
    },
  ];

  return (
    <div className="time-filter">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${value === f.value ? "active" : ""}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
