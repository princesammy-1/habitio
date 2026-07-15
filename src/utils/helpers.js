export function today() {
  const d = new Date();
  return dateStr(d);
}

export function dateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export function pastDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(dateStr(d));
  }
  return days;
}

export function dayOfWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function getMonthName(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short' });
}

export function isExpectedDay(cadence, dateStr) {
  if (!cadence) return true;
  const d = new Date(dateStr + 'T00:00:00');
  const dow = d.getDay();
  switch (cadence.type) {
    case 'daily': return true;
    case 'weekdays': return dow >= 1 && dow <= 5;
    case 'weekends': return dow === 0 || dow === 6;
    case 'custom':
      return cadence.daysOfWeek?.includes(dow) ?? false;
    case 'weekly':
      return true;
    default: return true;
  }
}

export function calcCurrentStreak(habit) {
  if (!habit.logs) return 0;
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = dateStr(d);
    if (!isExpectedDay(habit.cadence, key)) {
      d.setDate(d.getDate() - 1);
      continue;
    }
    const status = habit.logs[key];
    if (status === 'done' || status === 'skip') {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function calcLongestStreak(habit) {
  if (!habit.logs || !habit.createdAt) return 0;
  let longest = 0;
  let current = 0;
  const start = new Date(habit.createdAt + 'T00:00:00');
  const end = new Date();
  const cursor = new Date(start);
  while (cursor <= end) {
    const key = dateStr(cursor);
    if (!isExpectedDay(habit.cadence, key)) {
      cursor.setDate(cursor.getDate() + 1);
      continue;
    }
    const status = habit.logs[key];
    if (status === 'done' || status === 'skip') {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return longest;
}

export function calcRollingConsistency(habit, days = 30) {
  if (!habit.logs) return 0;
  let expected = 0;
  let done = 0;
  const d = new Date();
  for (let i = 0; i < days; i++) {
    const key = dateStr(d);
    if (isExpectedDay(habit.cadence, key)) {
      expected++;
      if (habit.logs[key] === 'done') done++;
    }
    d.setDate(d.getDate() - 1);
  }
  return expected > 0 ? Math.round((done / expected) * 100) : 0;
}

export function canUseSkipToken(habit) {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  if (habit.skipTokens.month !== currentMonth) return habit.skipTokens.limit;
  return Math.max(0, habit.skipTokens.limit - (habit.skipTokens.used || 0));
}

export function getTodayStatus(habit) {
  const key = today();
  if (!habit.logs || !habit.logs[key]) return null;
  return habit.logs[key];
}

const SLOT_RANGES = [
  { id: "dawn",     label: "Dawn",      start: 0,  end: 5   },
  { id: "morning",  label: "Morning",   start: 6,  end: 11  },
  { id: "afternoon",label: "Afternoon", start: 12, end: 17  },
  { id: "evening",  label: "Evening",   start: 18, end: 23  },
];

const EXACT_TIMES = [];
for (const slot of SLOT_RANGES) {
  for (let h = slot.start; h <= slot.end; h++) {
    EXACT_TIMES.push({ value: `${String(h).padStart(2, "0")}:00`, slot: slot.id });
    EXACT_TIMES.push({ value: `${String(h).padStart(2, "0")}:30`, slot: slot.id });
  }
}

function formatExactTime(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function getSlotFromExact(timeStr) {
  if (!timeStr) return null;
  const h = parseInt(timeStr.split(":")[0], 10);
  return SLOT_RANGES.find(s => h >= s.start && h <= s.end)?.id || null;
}

function getSlotLabel(slotId) {
  return SLOT_RANGES.find(s => s.id === slotId)?.label || slotId;
}

export { EXACT_TIMES, SLOT_RANGES, formatExactTime, getSlotFromExact, getSlotLabel };

export function getCadenceLabel(cadence) {
  if (!cadence) return 'Daily';
  switch (cadence.type) {
    case 'daily': return 'Daily';
    case 'weekdays': return 'Weekdays';
    case 'weekends': return 'Weekends';
    case 'weekly': return `${cadence.timesPerWeek}x / week`;
    case 'custom': {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return (cadence.daysOfWeek || []).map(d => days[d]).join(', ');
    }
    default: return 'Daily';
  }
}
