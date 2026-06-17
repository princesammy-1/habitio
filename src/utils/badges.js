import { calcLongestStreak, calcRollingConsistency, isExpectedDay, dateStr } from './helpers';

const BADGE_DEFS = [
  { id: 'first_done', label: 'First Step', desc: 'Complete your first habit', icon: '🌱' },
  { id: 'streak_3', label: 'On a Roll', desc: '3-day streak', icon: '🎉' },
  { id: 'streak_7', label: 'Week Warrior', desc: '7-day streak', icon: '🔥' },
  { id: 'streak_30', label: 'Monthly Momentum', desc: '30-day streak', icon: '💪' },
  { id: 'streak_50', label: 'Half Century', desc: '50-day streak', icon: '🔥🔥' },
  { id: 'streak_100', label: 'Centurion Streak', desc: '100-day streak', icon: '⚡' },
  { id: 'streak_200', label: 'Unbreakable', desc: '200-day streak', icon: '🛡️' },
  { id: 'streak_365', label: 'Year of Glory', desc: '365-day streak', icon: '🌟' },
  { id: 'streak_500', label: 'Mythical', desc: '500-day streak', icon: '🐉' },
  { id: 'perfect_week', label: 'Perfect Week', desc: '100% for 7 consecutive days', icon: '⭐' },
  { id: 'perfect_month', label: 'Perfect Month', desc: '100% for 30 consecutive days', icon: '🌙' },
  { id: 'perfect_quarter', label: 'Perfect Quarter', desc: '100% for 90 consecutive days', icon: '🌟' },
  { id: 'consistency_60', label: 'On Track', desc: '60%+ over 30 days', icon: '🚶' },
  { id: 'consistency_80', label: 'Consistent', desc: '80%+ over 30 days', icon: '🎯' },
  { id: 'consistency_95', label: 'Consistency King', desc: '95%+ over 30 days', icon: '👑' },
  { id: 'total_10', label: 'Steady Pace', desc: '10 total completions', icon: '📈' },
  { id: 'total_30', label: 'Dedicated', desc: '30 total completions', icon: '🏆' },
  { id: 'total_50', label: 'Halfway Hero', desc: '50 total completions', icon: '🏅' },
  { id: 'total_100', label: 'Centurion', desc: '100 total completions', icon: '💎' },
  { id: 'total_200', label: 'Double Centurion', desc: '200 total completions', icon: '💎💎' },
  { id: 'total_500', label: 'Relentless', desc: '500 total completions', icon: '🗡️' },
  { id: 'total_1000', label: 'Unstoppable', desc: '1000 total completions', icon: '👑' },
  { id: 'first_skip', label: 'Self-Care', desc: 'Used a skip token wisely', icon: '🧘' },
  { id: 'skip_5', label: 'Balanced Soul', desc: 'Used 5 skip tokens wisely', icon: '☯️' },
  { id: 'morning_10', label: 'Early Bird', desc: '10 morning completions', icon: '🌅' },
  { id: 'evening_10', label: 'Night Owl', desc: '10 evening completions', icon: '🦉' },
  { id: 'habit_5', label: 'Habit Enthusiast', desc: 'Created 5 habits', icon: '📚' },
  { id: 'habit_10', label: 'Habit Architect', desc: 'Created 10 habits', icon: '🏗️' },
  { id: 'time_variety', label: 'Well-Rounded', desc: 'Habits in all 3 time slots', icon: '🎨' },
  { id: 'cadence_variety', label: 'Versatile', desc: '3+ different schedule types', icon: '🔧' },
  { id: 'archive_first', label: 'Fresh Start', desc: 'Archived a habit', icon: '🧹' },
];

function checkPerfectWeek(habit) {
  return checkPerfectPeriod(habit, 7);
}

function checkPerfectPeriod(habit, days) {
  if (!habit.logs) return false;
  let count = 0;
  const d = new Date();
  for (let i = 0; i < days; i++) {
    const key = dateStr(d);
    if (!isExpectedDay(habit.cadence, key)) {
      d.setDate(d.getDate() - 1);
      continue;
    }
    if (habit.logs[key] === 'done') {
      count++;
    } else {
      return false;
    }
    d.setDate(d.getDate() - 1);
  }
  return count > 0;
}

export function checkBadges(habit) {
  const earned = [];

  const logs = habit.logs || {};
  const totalKeys = Object.keys(logs).length;
  const doneCount = Object.values(logs).filter(v => v === 'done').length;
  const skipCount = Object.values(logs).filter(v => v === 'skip').length;
  const longestStreak = calcLongestStreak(habit);
  const rolling = calcRollingConsistency(habit);

  if (totalKeys >= 1) earned.push('first_done');
  if (longestStreak >= 3) earned.push('streak_3');
  if (longestStreak >= 7) earned.push('streak_7');
  if (longestStreak >= 30) earned.push('streak_30');
  if (longestStreak >= 50) earned.push('streak_50');
  if (longestStreak >= 100) earned.push('streak_100');
  if (longestStreak >= 200) earned.push('streak_200');
  if (longestStreak >= 365) earned.push('streak_365');
  if (longestStreak >= 500) earned.push('streak_500');
  if (checkPerfectWeek(habit)) earned.push('perfect_week');
  if (checkPerfectPeriod(habit, 30)) earned.push('perfect_month');
  if (checkPerfectPeriod(habit, 90)) earned.push('perfect_quarter');
  if (rolling >= 60) earned.push('consistency_60');
  if (rolling >= 80) earned.push('consistency_80');
  if (rolling >= 95) earned.push('consistency_95');
  if (doneCount >= 10) earned.push('total_10');
  if (doneCount >= 30) earned.push('total_30');
  if (doneCount >= 50) earned.push('total_50');
  if (doneCount >= 100) earned.push('total_100');
  if (doneCount >= 200) earned.push('total_200');
  if (doneCount >= 500) earned.push('total_500');
  if (doneCount >= 1000) earned.push('total_1000');
  if (skipCount >= 5) earned.push('skip_5');
  if (habit.timeOfDay === 'morning' && doneCount >= 10) earned.push('morning_10');
  if (habit.timeOfDay === 'evening' && doneCount >= 10) earned.push('evening_10');

  const hasSkipped = Object.values(logs).some(v => v === 'skip');
  if (hasSkipped) earned.push('first_skip');

  return BADGE_DEFS.filter(b => earned.includes(b.id));
}

export function checkGlobalBadges(habits) {
  const earned = [];

  const active = habits.filter(h => !h.archived);

  if (active.length >= 5) earned.push('habit_5');
  if (active.length >= 10) earned.push('habit_10');

  const timeSlots = new Set(active.map(h => h.timeOfDay || 'any'));
  if (timeSlots.has('morning') && timeSlots.has('afternoon') && timeSlots.has('evening')) {
    earned.push('time_variety');
  }

  const cadenceTypes = new Set(active.map(h => h.cadence?.type).filter(Boolean));
  if (cadenceTypes.size >= 3) earned.push('cadence_variety');

  const hasArchived = habits.some(h => h.archived);
  if (hasArchived) earned.push('archive_first');

  return BADGE_DEFS.filter(b => earned.includes(b.id));
}

export function getAllBadges() {
  return BADGE_DEFS;
}
