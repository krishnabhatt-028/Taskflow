import {
  Folder,
  Activity,
  CheckCircle2,
  Clock,
  Loader,
  AlertTriangle,
  Users,
} from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'

const stats = [
  { label: 'Total Projects', icon: Folder },
  { label: 'Active Projects', icon: Activity },
  { label: 'Completed Projects', icon: CheckCircle2 },
  { label: 'Pending Tasks', icon: Clock },
  { label: 'In Progress Tasks', icon: Loader },
  { label: 'Overdue Tasks', icon: AlertTriangle },
  { label: 'Team Members', icon: Users },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Overview of your projects and tasks.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} icon={s.icon} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {['Recent Activities', 'Upcoming Deadlines'].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
            <div className="mt-6 py-8 text-center text-sm text-slate-400">
              Nothing here yet. Live data connects in Phase 8.
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
