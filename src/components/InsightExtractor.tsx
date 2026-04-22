import { useAppStore } from '../store/useAppStore'
import { PRIORITY_LABELS, PRIORITY_COLORS, PAINPOINT_LABELS } from '../utils/helpers'
import type { Insight } from '../types'

export function InsightExtractor() {
  const insights = useAppStore((s) => s.insights)
  if (insights.length === 0) return <p className="text-slate-500 text-sm">No insights extracted yet.</p>
  return <div className="space-y-2">{insights.map((i: Insight) => (
    <div key={i.id} className="bg-slate-800/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{i.title}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${PRIORITY_COLORS[i.priority]}`}>{PRIORITY_LABELS[i.priority]}</span>
      </div>
      <p className="text-xs text-slate-400 mb-1">{i.description}</p>
      <span className="text-xs text-slate-500">{PAINPOINT_LABELS[i.painPointType]}</span>
      {i.quotes.length > 0 && <blockquote className="text-xs text-slate-500 border-l-2 border-slate-600 pl-2 mt-1">"{i.quotes[0]}"</blockquote>}
    </div>
  ))}</div>
}