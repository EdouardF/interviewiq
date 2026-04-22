import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../store/useAppStore'
import type { Interview, Insight, PainPoint } from '../types'

describe('useAppStore', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('add/update/delete interview', () => {
    const i: Interview = { id: '1', participant: 'Alice', status: 'scheduled', date: '2026-01-15' }
    useAppStore.getState().addInterview(i)
    expect(useAppStore.getState().interviews).toHaveLength(1)
    useAppStore.getState().updateInterview('1', { status: 'analyzed' })
    expect(useAppStore.getState().interviews[0].status).toBe('analyzed')
    useAppStore.getState().deleteInterview('1')
    expect(useAppStore.getState().interviews).toHaveLength(0)
  })

  it('add/delete insight', () => {
    const i: Insight = { id: '1', interviewId: '', title: 'UX issue', description: 'Users confused', priority: 'high', painPointType: 'usability', quotes: [] }
    useAppStore.getState().addInsight(i)
    useAppStore.getState().updateInsight('1', { priority: 'critical' })
    expect(useAppStore.getState().insights[0].priority).toBe('critical')
    useAppStore.getState().deleteInsight('1')
    expect(useAppStore.getState().insights).toHaveLength(0)
  })

  it('add/update/delete pain point', () => {
    const p: PainPoint = { id: '1', title: 'Slow load', type: 'performance', frequency: 5, severity: 'high', interviews: [] }
    useAppStore.getState().addPainPoint(p)
    useAppStore.getState().updatePainPoint('1', { frequency: 10 })
    expect(useAppStore.getState().painPoints[0].frequency).toBe(10)
    useAppStore.getState().deletePainPoint('1')
    expect(useAppStore.getState().painPoints).toHaveLength(0)
  })

  it('search/filter state', () => {
    useAppStore.getState().setSearchQuery('alice')
    expect(useAppStore.getState().searchQuery).toBe('alice')
    useAppStore.getState().setFilterStatus('analyzed')
    expect(useAppStore.getState().filterStatus).toBe('analyzed')
    useAppStore.getState().setFilterPriority('critical')
    expect(useAppStore.getState().filterPriority).toBe('critical')
  })

  it('reset clears everything', () => {
    useAppStore.getState().setError('fail')
    useAppStore.getState().reset()
    expect(useAppStore.getState().error).toBeNull()
    expect(useAppStore.getState().interviews).toHaveLength(0)
  })
})