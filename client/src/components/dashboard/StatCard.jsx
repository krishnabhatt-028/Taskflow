export default function StatCard({ label, value = '—', icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  )
}