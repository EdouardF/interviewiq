import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { PRIORITY_LABELS, PRIORITY_COLORS, PAINPOINT_LABELS, PAINPOINT_COLORS } from '../utils/helpers'
import type { InsightPriority, PainPointType } from '../types'

export function InsightExtractor() {
  const { t } = useI18n()
  const insights = useAppStore((s) => s.insights)
  const addInsight = useAppStore((s) => s.addInsight)
  const deleteInsight = useAppStore((s) => s.deleteInsight)
  const [showForm, setShowForm] = useState(false)

  if (insights.length === 0 && !showForm) return (
    <div className="space-y-2">
      <p className="text-slate-500 text-sm">{t('noInsights')}</p>
      <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addInsight')}</button>
    </div>
  )

  return (
    <div className="space-y-3">
      {insights.map((i) => (
        <div key={i.id} className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs px-2 py-0.5 rounded ${PRIORITY_COLORS[i.priority]}`}>{PRIORITY_LABELS[i.priority]}</span>
            <span className={`text-xs ${PAINPOINT_COLORS[i.painPointType]}`}>{PAINPOINT_LABELS[i.painPointType]}</span>
          </div>
          <p className="text-sm font-medium">{i.title}</p>
          <p className="text-xs text-slate-500 mt-1">{i.description}</p>
          {i.quotes.length > 0 && (
            <div className="mt-2 space-y-1">
              {i.quotes.map((q, idx) => <p key={idx} className="text-xs text-slate-400 italic border-l-2 border-violet-500 pl-2">"{q}"</p>)}
            </div>
          )}
          <div className="flex justify-end mt-2">
            <button onClick={() => deleteInsight(i.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
          </div>
        </div>
      ))}
      {showForm ? (
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <input id="ins-title" placeholder={t('title')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <textarea id="ins-desc" placeholder={t('description')} rows={2} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm resize-none" />
          <select id="ins-priority" className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm">
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select id="ins-type" className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm">
            {Object.entries(PAINPOINT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={() => {
              const title = (document.getElementById('ins-title') as HTMLInputElement).value
              const description = (document.getElementById('ins-desc') as HTMLTextAreaElement).value
              const priority = (document.getElementById('ins-priority') as HTMLSelectElement).value as InsightPriority
              const painPointType = (document.getElementById('ins-type') as HTMLSelectElement).value as PainPointType
              if (!title) return
              addInsight({ id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36), interviewId: '', title, description, priority, painPointType, quotes: [] })
              setShowForm(false)
            }} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
            <button onClick={() => setShowForm(false)} className="text-xs text-slate-400">{t('cancel')}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addInsight')}</button>
      )}
    </div>
  )
}