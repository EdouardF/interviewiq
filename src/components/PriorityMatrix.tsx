import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { PRIORITY_LABELS, PRIORITY_COLORS, PAINPOINT_LABELS, PAINPOINT_COLORS } from '../utils/helpers'
import type { InsightPriority, PainPointType } from '../types'

export function PriorityMatrix() {
  const { t } = useI18n()
  const painPoints = useAppStore((s) => s.painPoints)
  const addPainPoint = useAppStore((s) => s.addPainPoint)
  const deletePainPoint = useAppStore((s) => s.deletePainPoint)
  const [showForm, setShowForm] = useState(false)
  const [ppTitle, setPpTitle] = useState('')
  const [ppType, setPpType] = useState<PainPointType>('usability')
  const [ppSeverity, setPpSeverity] = useState<InsightPriority>('medium')

  const resetForm = () => { setPpTitle(''); setPpType('usability'); setPpSeverity('medium') }
  const handleSave = () => {
    if (!ppTitle) return
    addPainPoint({ id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36), title: ppTitle, type: ppType, frequency: 1, severity: ppSeverity, interviews: [] })
    resetForm(); setShowForm(false)
  }
  const handleCancel = () => { resetForm(); setShowForm(false) }

  const highPriority = painPoints.filter((p) => p.severity === 'critical' || p.severity === 'high')
  const medPriority = painPoints.filter((p) => p.severity === 'medium')
  const lowPriority = painPoints.filter((p) => p.severity === 'low')

  if (painPoints.length === 0 && !showForm) return (
    <div className="space-y-2">
      <p className="text-slate-500 text-sm">{t('noPainPoints')}</p>
      <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addPainPoint')}</button>
    </div>
  )

  const renderGroup = (label: string, items: typeof painPoints, colorClass: string) => (
    <div className="space-y-2">
      <p className={`text-xs font-medium ${colorClass}`}>{label}</p>
      {items.map((p) => (
        <div key={p.id} className="bg-slate-800/50 rounded-lg p-2">
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-xs ${PAINPOINT_COLORS[p.type]}`}>{PAINPOINT_LABELS[p.type]}</span>
              <p className="text-sm">{p.title}</p>
              <p className="text-xs text-slate-500">{t('frequency')}: {p.frequency}</p>
            </div>
            <button onClick={() => deletePainPoint(p.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      {highPriority.length > 0 && renderGroup(`🔴 ${PRIORITY_LABELS.critical} / ${PRIORITY_LABELS.high}`, highPriority, 'text-rose-400')}
      {medPriority.length > 0 && renderGroup(`🟡 ${PRIORITY_LABELS.medium}`, medPriority, 'text-amber-400')}
      {lowPriority.length > 0 && renderGroup(`🟢 ${PRIORITY_LABELS.low}`, lowPriority, 'text-slate-400')}
      {showForm ? (
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <input value={ppTitle} onChange={(e) => setPpTitle(e.target.value)} placeholder={t('title')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <select value={ppType} onChange={(e) => setPpType(e.target.value as PainPointType)} className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm">
            {Object.entries(PAINPOINT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={ppSeverity} onChange={(e) => setPpSeverity(e.target.value as InsightPriority)} className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm">
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={handleSave} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
            <button onClick={handleCancel} className="text-xs text-slate-400">{t('cancel')}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addPainPoint')}</button>
      )}
    </div>
  )
}