import { useAppStore } from '../store/useAppStore'
import { PAINPOINT_LABELS, PAINPOINT_COLORS, PRIORITY_LABELS } from '../utils/helpers'
import type { PainPoint } from '../types'

export function PriorityMatrix() {
  const painPoints = useAppStore((s) => s.painPoints)
  if (painPoints.length === 0) return <p className="text-slate-500 text-sm">No pain points identified.</p>
  return <div className="space-y-2">{painPoints.map((p: PainPoint) => (
    <div key={p.id} className="bg-slate-800/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{p.title}</span>
        <span className={`text-xs ${PAINPOINT_COLORS[p.type]}`}>{PAINPOINT_LABELS[p.type]}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Severity: {PRIORITY_LABELS[p.severity]}</span>
        <span>{p.frequency}× across {p.interviews.length} interviews</span>
      </div>
    </div>
  ))}</div>
}