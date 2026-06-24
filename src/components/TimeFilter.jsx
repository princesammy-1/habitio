import { FiSunrise, FiSun, FiMoon, FiArchive } from "react-icons/fi";

export default function TimeFilter({ value, onChange }) {
  const filters = [
    { value: "all", label: "All" },
    {
      value: "morning",
      label: (
        <>
          <FiSunrise /> Morning
        </>
      ),
    },
    {
      value: "afternoon",
      label: (
        <>
          <FiSun /> Afternoon
        </>
      ),
    },
    {
      value: "evening",
      label: (
        <>
          <FiMoon /> Evening
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
