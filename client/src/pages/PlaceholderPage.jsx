export default function PlaceholderPage({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h1>
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
        This page will be built in a later phase.
      </div>
    </div>
  )
}