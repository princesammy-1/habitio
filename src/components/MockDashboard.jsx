import DashboardHeader from './DashboardHeader'
import HeroFeatureCard from './HeroFeatureCard'
import MetricsGrid from './MetricsGrid'
import HabitListView from './HabitListView'
import FloatingPillNav from './FloatingPillNav'

export default function MockDashboard() {
  return (
    <div style={{
      maxWidth: 420,
      margin: '0 auto',
      position: 'relative',
      background: '#F8FAFC',
      minHeight: '100vh',
      paddingBottom: 100,
      borderRadius: 32,
      overflow: 'hidden',
    }}>
      <DashboardHeader name="Sarah" streak={12} avatar="S" />

      <div style={{ paddingBottom: 24 }}>
        <HeroFeatureCard completed={5} total={9} progress={72} />
        <MetricsGrid />
        <HabitListView />
      </div>

      <FloatingPillNav />
    </div>
  )
}
