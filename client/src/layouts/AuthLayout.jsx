import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            T
          </div>
          <span className="text-2xl font-semibold text-slate-900 dark:text-white">
            TaskFlow
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  )
}