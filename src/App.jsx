import { useCallback, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { today } from './utils/helpers';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import AddHabitForm from './components/AddHabitForm';
import StatsBar from './components/StatsBar';
import HabitList from './components/HabitList';
import WeekView from './components/WeekView';
import ContributionGrid from './components/ContributionGrid';
import BadgeDisplay from './components/BadgeDisplay';
import MotivationDisplay from './components/MotivationDisplay';
import TimeAnalytics from './components/TimeAnalytics';
import MockDashboard from './components/MockDashboard';
import './App.css';

function createHabit(name, cadence = { type: 'daily' }, timeOfDay = null) {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: today(),
    archived: false,
    timeOfDay,
    cadence,
    skipTokens: { limit: 2, used: 0, month },
    logs: {},
  };
}

function resetSkipTokensIfNeeded(habit) {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  if (habit.skipTokens.month !== currentMonth) {
    return { ...habit, skipTokens: { ...habit.skipTokens, used: 0, month: currentMonth } };
  }
  return habit;
}

function AppContent() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [habits, setHabits] = useLocalStorage('habitio_data', []);

  const addHabit = useCallback((name, cadence, timeOfDay) => {
    setHabits(prev => [...prev, createHabit(name, cadence, timeOfDay)]);
  }, [setHabits]);

  const toggleHabit = useCallback((id) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h;
        h = resetSkipTokensIfNeeded(h);
        const logs = { ...h.logs };
        logs[today()] = logs[today()] === 'done' ? null : 'done';
        return { ...h, logs };
      })
    );
  }, [setHabits]);

  const skipHabit = useCallback((id) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h;
        h = resetSkipTokensIfNeeded(h);
        const logs = { ...h.logs };
        if (logs[today()] !== 'done') {
          logs[today()] = 'skip';
          return {
            ...h,
            logs,
            skipTokens: { ...h.skipTokens, used: (h.skipTokens.used || 0) + 1 },
          };
        }
        return h;
      })
    );
  }, [setHabits]);

  const deleteHabit = useCallback((id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  }, [setHabits]);

  const archiveHabit = useCallback((id) => {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, archived: !h.archived } : h)
    );
  }, [setHabits]);

  const visibleHabits = habits.map(resetSkipTokensIfNeeded);

  if (showDesignSystem) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
          <button
            onClick={() => setShowDesignSystem(false)}
            style={{
              padding: '8px 20px', borderRadius: 100, border: '1px solid #E5E7EB',
              background: '#fff', color: '#1F2937', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← Back to Habit Tracker
          </button>
        </div>
        <MockDashboard />
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <button
        onClick={() => setShowDesignSystem(true)}
        style={{
          marginBottom: 12,
          padding: '8px 20px', borderRadius: 100, border: '1px solid var(--border)',
          background: 'var(--bg-surface)', color: 'var(--text-secondary)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%', textAlign: 'center',
        }}
      >
        View Design System Mockup
      </button>
      <MotivationDisplay habits={visibleHabits} />
      <AddHabitForm onAdd={addHabit} />
      <StatsBar habits={visibleHabits} />
      <HabitList
        habits={visibleHabits}
        onToggle={toggleHabit}
        onSkip={skipHabit}
        onDelete={deleteHabit}
        onArchive={archiveHabit}
      />
      <WeekView habits={visibleHabits} />
      <ContributionGrid habits={visibleHabits} />
      <BadgeDisplay habits={visibleHabits} />
      <TimeAnalytics habits={visibleHabits} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
