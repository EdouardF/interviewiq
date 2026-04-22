import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore, useInterviewStats } from '../store/useAppStore'
import { INTERVIEW_STATUS_LABELS, generateId } from '../utils/helpers'
import type { InterviewStatus } from '../types'
import { InterviewList } from './InterviewList'
import { InsightExtractor } from './InsightExtractor'
import { PriorityMatrix } from './PriorityMatrix'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export function Dashboard() {
  const { t } = useI18n()
  const stats = useInterviewStats()
  const addInterview = useAppStore((s) => s.addInterview)
  const [showAdd, setShowAdd] = useState(false)
  const [ivPart, setIvPart] = useState('')
  const [ivStatus, setIvStatus] = useState<InterviewStatus>('scheduled')
  const [ivDur, setIvDur] = useState('')
  const [ivNotes, setIvNotes] = useState('')

  const resetForm = () => { setIvPart(''); setIvStatus('scheduled'); setIvDur(''); setIvNotes('') }
  const handleSave = () => {
    if (!ivPart) return
    addInterview({ id: generateId(), participant: ivPart, status: ivStatus, duration: parseInt(ivDur) || undefined, date: new Date().toISOString().split('T')[0], notes: ivNotes || undefined })
    resetForm(); setShowAdd(false)
  }
  const handleCancel = () => { resetForm(); setShowAdd(false) }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white transition-colors">
      <header className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t('appTitle')}</h1>
            <p className="text-sm text-slate-500">{t('appSubtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        {stats.total > 0 && (
          <div className="flex gap-4 mt-3 text-xs">
            <span className="text-slate-400">{t('totalInterviews')}: {stats.total}</span>
            {stats.analyzed > 0 && <span className="text-emerald-400">{t('analyzed')}: {stats.analyzed}</span>}
            {stats.insights > 0 && <span className="text-violet-400">{t('insights')}: {stats.insights}</span>}
          </div>
        )}
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-slate-400">{t('interviews')}</h2>
            <button onClick={() => setShowAdd(!showAdd)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addInterview')}</button>
          </div>
          {showAdd && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-3 space-y-2">
              <input value={ivPart} onChange={(e) => setIvPart(e.target.value)} placeholder={t('participant')} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <select value={ivStatus} onChange={(e) => setIvStatus(e.target.value as InterviewStatus)} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1.5 text-sm">
                {Object.entries(INTERVIEW_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <input value={ivDur} onChange={(e) => setIvDur(e.target.value)} type="number" placeholder={t('duration')} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <textarea value={ivNotes} onChange={(e) => setIvNotes(e.target.value)} placeholder={t('notes')} rows={2} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm resize-none" />
              <div className="flex gap-2">
                <button onClick={handleSave} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
                <button onClick={handleCancel} className="text-xs text-slate-400">{t('cancel')}</button>
              </div>
            </div>
          )}
          <InterviewList />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">{t('insights')}</h2>
          <InsightExtractor />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">{t('priorityMatrix')}</h2>
          <PriorityMatrix />
        </div>
      </main>
    </div>
  )
}