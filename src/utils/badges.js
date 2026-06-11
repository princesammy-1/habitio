import { calcLongestStreak, calcRollingConsistency } from './helpers';

const BADGE_DEFS = [
  { id: 'first_done', label: 'First Step', desc: 'Complete your first habit', icon: '🌱' },
  { id: 'streak_7', label: 'Week Warrior', desc: '7-day streak', icon: '🔥' },
  { id: 'streak_30', label: 'Monthly Momentum', desc: '30-day streak', icon: '💪' },
  { id: 'streak_100', label: 'Centurion Streak', desc: '100-day streak', icon: '⚡' },
  { id: 'perfect_week', label: 'Perfect Week', desc: '100% for 7 consecutive days', icon: '⭐' },
  { id: 'consistency_80', label: 'Consistent', desc: '80%+ over 30 days', icon: '🎯' },
  { id: 'consistency_95', label: 'Consistency King', desc: '95%+ over 30 days', icon: '👑' },
  { id: 'total_30', label: 'Dedicated', desc: '30 total completions', icon: '🏆' },
  { id: 'total_100', label: 'Centurion', desc: '100 total completions', icon: '💎' },
  { id: 'first_skip', label: 'Self-Care', desc: 'Used a skip token wisely', icon: '🧘' },
];

function checkPerfectWeek(habit) {
  if (!habit.logs) return false;
  let count = 0;
  const d = new Date();
  for (let i = 0; i < 7; i++) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${day}`;
    if (habit.logs[key] === 'done') count++;
    d.setDate(d.getDate() - 1);
  }
  return count >= 7;
}

export function checkBadges(habit) {
  const earned = [];

  const totalDone = Object.keys(habit.logs || {}).length;
  const longestStreak = calcLongestStreak(habit);
  const rolling = calcRollingConsistency(habit);

  if (totalDone >= 1) earned.push('first_done');
  if (longestStreak >= 7) earned.push('streak_7');
  if (longestStreak >= 30) earned.push('streak_30');
  if (longestStreak >= 100) earned.push('streak_100');
  if (checkPerfectWeek(habit)) earned.push('perfect_week');
  if (rolling >= 80) earned.push('consistency_80');
  if (rolling >= 95) earned.push('consistency_95');
  if (totalDone >= 30) earned.push('total_30');
  if (totalDone >= 100) earned.push('total_100');

  const hasSkipped = Object.values(habit.logs || {}).some(v => v === 'skip');
  if (hasSkipped) earned.push('first_skip');

  return BADGE_DEFS.filter(b => earned.includes(b.id));
}

export function getAllBadges() {
  return BADGE_DEFS;
}
