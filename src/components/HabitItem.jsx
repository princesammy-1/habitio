import { useState, useRef, useCallback } from "react";
import { FiOctagon, FiArchive, FiTrash2, FiZap } from "react-icons/fi";
import { FaBan, FaTrashAlt, FaArchive } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import {
  calcCurrentStreak,
  calcLongestStreak,
  calcRollingConsistency,
  canUseSkipToken,
  getTodayStatus,
  getCadenceLabel,
  formatExactTime,
  getSlotFromExact,
} from "../utils/helpers";

export default function HabitItem({
  habit,
  onToggle,
  onSkip,
  onDelete,
  onArchive,
}) {
  const [swiping, setSwiping] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const itemRef = useRef(null);
  const startX = useRef(0);

  const status = getTodayStatus(habit);
  const isDone = status === "done";
  const isSkipped = status === "skip";
  const streak = calcCurrentStreak(habit);
  const longestStreak = calcLongestStreak(habit);
  const consistency = calcRollingConsistency(habit);
  const skipTokensLeft = canUseSkipToken(habit);
  const cadenceLabel = getCadenceLabel(habit.cadence);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
    setSwiping(true);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!swiping) return;
      const dx = e.touches[0].clientX - startX.current;
      setSwipeX(Math.max(-80, Math.min(80, dx)));
    },
    [swiping],
  );

  const handleTouchEnd = useCallback(() => {
    setSwiping(false);
    if (swipeX > 40) {
      onToggle();
    } else if (swipeX < -40) {
      if (skipTokensLeft > 0 && !isDone && !isSkipped) {
        onSkip();
      }
    }
    setSwipeX(0);
  }, [swipeX, onToggle, onSkip, skipTokensLeft, isDone, isSkipped]);

  const flameLevel =
    streak >= 100
      ? 4
      : streak >= 50
        ? 3
        : streak >= 21
          ? 2
          : streak >= 7
            ? 1
            : 0;
  const flame = flameLevel > 0 ? <FiZap /> : null;

  return (
    <div
      ref={itemRef}
      className={`habit ${isDone ? "done" : ""} ${isSkipped ? "skipped" : ""} ${confirmDelete ? "deleting" : ""}`}
      style={
        swiping
          ? { transform: `translateX(${swipeX}px)`, transition: "none" }
          : { transform: "translateX(0)" }
      }
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="habit-left">
        <button
          className={`check ${isDone ? "checked" : ""} ${isSkipped ? "skipped" : ""}`}
          onClick={() => {
            if (!isSkipped) onToggle();
          }}
          aria-label="Toggle habit"
        >
          {isDone ? (
            <svg viewBox="0 0 14 14">
              <polyline points="2 7 5.5 10.5 12 3.5" />
            </svg>
          ) : isSkipped ? (
            <span className="skip-mark">−</span>
          ) : null}
        </button>
      </div>

      <div className="habit-body">
        <div className="habit-top">
          <span className="name">{habit.name}</span>
          <div className="habit-actions">
            {!isDone && !isSkipped && skipTokensLeft > 0 && (
              <button
                className="action-btn skip-btn"
                onClick={onSkip}
                title="Use skip token"
              >
                {isDark ? <FiOctagon /> : <FaBan />}
              </button>
            )}
            {!habit.archived && (
              <button
                className="action-btn archive-btn"
                onClick={onArchive}
                title="Archive habit"
              >
                {isDark ? <FiArchive /> : <FaArchive />}
              </button>
            )}
            <button
              className="action-btn delete-btn"
              onClick={() => setConfirmDelete(!confirmDelete)}
              title="Delete habit"
            >
              {isDark ? <FiTrash2 /> : <FaTrashAlt />}
            </button>
          </div>
        </div>

        <div className="habit-meta">
          <span className="cadence-badge">{cadenceLabel}</span>
          {habit.timeOfDay && (
            <span className={`tod-badge ${getSlotFromExact(habit.timeOfDay)}`}>
              {formatExactTime(habit.timeOfDay)}
            </span>
          )}
        </div>

        <div className="habit-stats">
          <div className="stat-row">
            <span className="flame">{flame}</span>
            <span className="streak-num">{streak}d</span>
            <span className="streak-label">current</span>
            <span className="sep">·</span>
            <span className="streak-num best">{longestStreak}d</span>
            <span className="streak-label">best</span>
            <span className="sep">·</span>
            <span className="consistency">{consistency}%</span>
            <span className="streak-label">30d</span>
          </div>
          <div className="streak-bar">
            <div
              className="streak-fill"
              style={{
                width: `${Math.min(100, (streak / Math.max(1, longestStreak)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div
          className="confirm-overlay"
          onClick={() => setConfirmDelete(false)}
        >
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <p>Delete this habit?</p>
            <p className="confirm-hint">Progress will be lost forever.</p>
            <div className="confirm-actions">
              <button className="btn-danger" onClick={onDelete}>
                Delete
              </button>
              <button
                className="btn-ghost"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
