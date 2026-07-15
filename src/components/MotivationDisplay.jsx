import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { calcCurrentStreak, calcRollingConsistency } from "../utils/helpers";

function currentTimeSlot() {
  const h = new Date().getHours();
  if (h >= 0 && h < 6) return "dawn";
  if (h >= 6 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  return "evening";
}

const SLOT_LABELS = {
  dawn: "00:00-05:59",
  morning: "06:00-11:59",
  afternoon: "12:00-17:59",
  evening: "18:00-23:59",
};

const TIME_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "dawn", label: SLOT_LABELS.dawn },
  { value: "morning", label: SLOT_LABELS.morning },
  { value: "afternoon", label: SLOT_LABELS.afternoon },
  { value: "evening", label: SLOT_LABELS.evening },
];

const MESSAGES = [
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
    tags: ["discipline"],
  },
  {
    text: "The pain of discipline weighs ounces. The pain of regret weighs tons.",
    author: "Jim Rohn",
    tags: ["discipline"],
  },
  {
    text: "Small daily improvements over time lead to stunning results.",
    author: "Robin Sharma",
    tags: ["consistency", "progress"],
  },
  {
    text: "You don't need to be extreme, just consistent.",
    author: "Unknown",
    tags: ["consistency"],
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    tags: ["consistency", "progress"],
  },
  {
    text: "Motivation gets you started. Habit keeps you going.",
    author: "Jim Ryun",
    tags: ["habit", "motivation"],
    time: "morning",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    tags: ["habit", "excellence"],
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    tags: ["motivation", "start"],
    time: "morning",
  },
  {
    text: "Don't break the chain.",
    author: "Jerry Seinfeld",
    tags: ["streak", "consistency"],
  },
  {
    text: "It's not about having time. It's about making time.",
    author: "Unknown",
    tags: ["discipline", "motivation"],
  },
  {
    text: "A year from now you'll wish you started today.",
    author: "Karen Lamb",
    tags: ["motivation", "start"],
    time: "morning",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    tags: ["motivation", "start"],
    time: "morning",
  },
  {
    text: "Your habits shape your future. Choose them wisely.",
    author: "Unknown",
    tags: ["habit", "discipline"],
  },
  {
    text: "Push yourself because no one else is going to do it for you.",
    author: "Unknown",
    tags: ["motivation", "discipline"],
    time: "morning",
  },
  {
    text: "Strive for progress, not perfection.",
    author: "Unknown",
    tags: ["progress", "motivation"],
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    tags: ["discipline", "action"],
    time: "morning",
  },
  {
    text: "Discipline is doing what needs to be done, even when you don't want to do it.",
    author: "Unknown",
    tags: ["discipline"],
  },
  {
    text: "Your consistency is your superpower.",
    author: "Unknown",
    tags: ["consistency", "streak"],
  },
  {
    text: "Every day you show up, you're building the person you want to become.",
    author: "Unknown",
    tags: ["progress", "habit"],
    time: "morning",
  },
  {
    text: "The chains of habit are too weak to be felt until they are too strong to be broken.",
    author: "Samuel Johnson",
    tags: ["habit", "discipline"],
    time: "evening",
  },
  {
    text: "Success doesn't come from what you do occasionally. It comes from what you do consistently.",
    author: "Marie Forleo",
    tags: ["consistency", "success"],
    time: "afternoon",
  },
  {
    text: "Be the designer of your world and not merely the consumer of it.",
    author: "James Clear",
    tags: ["discipline", "habit"],
  },
  {
    text: "Every action you take is a vote for the type of person you wish to become.",
    author: "James Clear",
    tags: ["habit", "identity"],
    time: "morning",
  },
  {
    text: "The most powerful thing you can do is show up every day.",
    author: "Unknown",
    tags: ["consistency", "discipline"],
    time: "morning",
  },
  {
    text: "Don't let what you cannot do interfere with what you can do.",
    author: "John Wooden",
    tags: ["motivation", "discipline"],
    time: "afternoon",
  },
  {
    text: "It never gets easier. You just get stronger.",
    author: "Unknown",
    tags: ["motivation", "discipline"],
    time: "afternoon",
  },
  {
    text: "The difference between who you are and who you want to be is what you do.",
    author: "Unknown",
    tags: ["action", "discipline"],
  },
  {
    text: "Your habits are the compound interest of self-improvement.",
    author: "James Clear",
    tags: ["habit", "progress"],
    time: "afternoon",
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "Japanese Proverb",
    tags: ["resilience", "motivation"],
    time: "evening",
  },
  {
    text: "The only person you should try to be better than is the person you were yesterday.",
    author: "Unknown",
    tags: ["progress", "motivation"],
    time: "evening",
  },
  {
    text: "Morning wins build momentum for the rest of your day.",
    author: "Unknown",
    tags: ["morning", "momentum"],
    time: "morning",
  },
  {
    text: "The afternoon is where discipline meets distraction. Stay the course.",
    author: "Unknown",
    tags: ["afternoon", "discipline"],
    time: "afternoon",
  },
  {
    text: "Evenings are for reflecting on what you built today.",
    author: "Unknown",
    tags: ["evening", "reflection"],
    time: "evening",
  },
  {
    text: "Win the morning, win the day.",
    author: "Unknown",
    tags: ["morning", "discipline"],
    time: "morning",
  },
  {
    text: "The midday slump is just your comfort zone asking you to quit.",
    author: "Unknown",
    tags: ["afternoon", "persistence"],
    time: "afternoon",
  },
  {
    text: "Rest tonight so you can rise tomorrow.",
    author: "Unknown",
    tags: ["evening", "rest"],
    time: "evening",
  },
];

function pickMessage(habits, timeFilter) {
  let filtered = MESSAGES;

  if (timeFilter && timeFilter !== "any") {
    filtered = filtered.filter(
      (m) => !m.time || m.time === timeFilter,
    );
  }

  const bestStreak = habits
    .filter((h) => !h.archived)
    .reduce((max, h) => Math.max(max, calcCurrentStreak(h)), 0);

  const avgConsistency =
    habits.filter((h) => !h.archived).length > 0
      ? Math.round(
          habits
            .filter((h) => !h.archived)
            .reduce((s, h) => s + calcRollingConsistency(h), 0) /
            habits.filter((h) => !h.archived).length,
        )
      : 0;

  if (bestStreak === 0) {
    filtered = MESSAGES.filter(
      (m) =>
        m.tags.includes("motivation") ||
        m.tags.includes("start") ||
        m.tags.includes("action"),
    );
  } else if (bestStreak >= 7 && bestStreak < 30) {
    filtered = MESSAGES.filter(
      (m) =>
        m.tags.includes("consistency") ||
        m.tags.includes("streak") ||
        m.tags.includes("progress"),
    );
  } else if (bestStreak >= 30) {
    filtered = MESSAGES.filter(
      (m) =>
        m.tags.includes("habit") ||
        m.tags.includes("excellence") ||
        m.tags.includes("identity"),
    );
  }

  if (avgConsistency >= 80 && filtered.length > 3) {
    filtered = filtered.filter(
      (m) => m.tags.includes("excellence") || m.tags.includes("progress"),
    );
    if (filtered.length === 0) {
      filtered = MESSAGES.filter((m) => m.tags.includes("progress"));
    }
  }

  if (filtered.length === 0) filtered = MESSAGES;

  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function MotivationDisplay({ habits }) {
  const [timeFilter, setTimeFilter] = useState(() => currentTimeSlot());
  const [msg, setMsg] = useState(() => pickMessage(habits, timeFilter));
  const [fadeKey, setFadeKey] = useState(0);

  function selectTime(slot) {
    setTimeFilter(slot);
    setMsg(pickMessage(habits, slot));
    setFadeKey((k) => k + 1);
  }

  function handleRefresh() {
    setMsg(pickMessage(habits, timeFilter));
    setFadeKey((k) => k + 1);
  }

  return (
    <div className="motivation-bar" key={fadeKey}>
      <blockquote className="motivation-text">
        &ldquo;{msg.text}&rdquo;
        <span className="motivation-author">&mdash; {msg.author}</span>
        <button
          className="motivation-refresh"
          onClick={handleRefresh}
          title="See another message"
        >
          <FiRefreshCw />
        </button>
      </blockquote>
      <div className="motivation-times">
        {TIME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`motivation-time-pill ${timeFilter === opt.value ? "active" : ""}`}
            onClick={() => selectTime(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
