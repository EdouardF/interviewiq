import { useAppStore } from '../store/useAppStore'
import { INTERVIEW_STATUS_LABELS, INTERVIEW_STATUS_COLORS, formatDate } from '../utils/helpers'
import type { Interview } from '../types'

export function InterviewList() {
  const interviews = useAppStore((s) => s.interviews)
  if (interviews.length === 0) return <p className="text-slate-500 text-sm">No interviews scheduled.</p>
  return <div className="space-y-2">{interviews.map((i: Interview) => (
    <div key={i.id} className="bg-slate-800/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{i.participant}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${INTERVIEW_STATUS_COLORS[i.status]}`}>{INTERVIEW_STATUS_LABELS[i.status]}</span>
      </div>
      <p className="text-xs text-slate-500">{formatDate(i.date)}</p>
    </div>
  ))}</div>
}