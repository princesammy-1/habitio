import HabitItem from "./HabitItem";
import { FiClipboard } from "react-icons/fi";

export default function HabitList({ habits, onToggle, onSkip, onDelete, onArchive }) {
  const filtered = habits.filter((h) => !h.archived);

  if (filtered.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">
          <FiClipboard />
        </div>
        <p>No habits here yet.</p>
      </div>
    );
  }

  return (
    <div>
      {filtered.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={() => onToggle(habit.id)}
          onSkip={() => onSkip(habit.id)}
          onDelete={() => onDelete(habit.id)}
          onArchive={() => onArchive(habit.id)}
        />
      ))}
    </div>
  );
}
