import { useI18n } from '../i18n/I18nProvider'
import { useAppStore, useFilteredInterviews } from '../store/useAppStore'
import { INTERVIEW_STATUS_LABELS, INTERVIEW_STATUS_COLORS, formatDate, formatDuration } from '../utils/helpers'
import type { InterviewStatus } from '../types'

export function InterviewList() {
  const { t } = useI18n()
  const filtered = useFilteredInterviews()
  const { searchQuery, filterStatus, sortBy, selectedInterview, setSelectedInterview, setSearchQuery, setFilterStatus, setSortBy, deleteInterview } = useAppStore()
  const total = useAppStore((s) => s.interviews.length)

  if (total === 0) return <p className="text-slate-500 text-sm">{t('noInterviews')}</p>

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('search')}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500" />
        <div className="flex gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as InterviewStatus | '')}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
            <option value="">{t('all')} — {t('status')}</option>
            {Object.entries(INTERVIEW_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'date' | 'participant')}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
            <option value="date">{t('sortDate')}</option>
            <option value="participant">{t('sortParticipant')}</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((i) => (
          <div key={i.id} onClick={() => setSelectedInterview(i.id === selectedInterview ? null : i.id)}
            className={`bg-slate-800/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-colors border ${i.id === selectedInterview ? 'border-violet-500' : 'border-transparent'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs px-2 py-0.5 rounded ${INTERVIEW_STATUS_COLORS[i.status]}`}>{INTERVIEW_STATUS_LABELS[i.status]}</span>
              <span className="text-xs text-slate-500">{formatDate(i.date)}</span>
            </div>
            <p className="text-sm font-medium">{i.participant}</p>
            {i.duration && <p className="text-xs text-slate-500">{formatDuration(i.duration)}</p>}
            {i.id === selectedInterview && (
              <div className="flex justify-end mt-2">
                <button onClick={(e) => { e.stopPropagation(); deleteInterview(i.id) }} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}