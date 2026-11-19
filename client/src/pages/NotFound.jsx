import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        This page does not exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Back to dashboard
      </Link>
    </div>
  )
}