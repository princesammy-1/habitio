import DashboardHeader from './DashboardHeader'
import HeroFeatureCard from './HeroFeatureCard'
import MetricsGrid from './MetricsGrid'
import HabitListView from './HabitListView'
import FloatingPillNav from './FloatingPillNav'

export default function MockDashboard() {
  return (
    <div className="app-viewport">
      <DashboardHeader name="Sarah" streak={12} avatar="S" />
      <HeroFeatureCard completed={5} total={9} progress={72} />
      <MetricsGrid />
      <HabitListView />
      <FloatingPillNav />
    </div>
  )
}
