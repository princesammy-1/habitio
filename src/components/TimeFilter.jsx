export default function TimeFilter({ value, onChange }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'morning', label: '🌅 Morning' },
    { value: 'afternoon', label: '☀️ Afternoon' },
    { value: 'evening', label: '🌙 Evening' },
    { value: 'archived', label: '📦 Archived' },
  ];

  return (
    <div className="time-filter">
      {filters.map(f => (
        <button
          key={f.value}
          className={`filter-btn ${value === f.value ? 'active' : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
