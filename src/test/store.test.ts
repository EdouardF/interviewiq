import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../store/useAppStore'
import type { Interview, Transcript, Insight, PainPoint } from '../types'

describe('useAppStore', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('add/update/delete interview', () => {
    const i: Interview = { id: '1', participant: 'Alice', status: 'scheduled', date: '2026-01-01' }
    useAppStore.getState().addInterview(i)
    expect(useAppStore.getState().interviews).toHaveLength(1)
    useAppStore.getState().updateInterview('1', { status: 'analyzed' })
    expect(useAppStore.getState().interviews[0].status).toBe('analyzed')
    useAppStore.getState().deleteInterview('1')
    expect(useAppStore.getState().interviews).toHaveLength(0)
  })

  it('add/delete transcript', () => {
    const t: Transcript = { id: '1', interviewId: 'i1', text: 'Hello', timestamp: '2026-01-01' }
    useAppStore.getState().addTranscript(t)
    expect(useAppStore.getState().transcripts).toHaveLength(1)
    useAppStore.getState().deleteTranscript('1')
    expect(useAppStore.getState().transcripts).toHaveLength(0)
  })

  it('add/update/delete insight', () => {
    const i: Insight = { id: '1', interviewId: 'i1', title: 'UX issue', description: 'Hard to navigate', priority: 'high', painPointType: 'usability', quotes: ['It was confusing'] }
    useAppStore.getState().addInsight(i)
    useAppStore.getState().updateInsight('1', { priority: 'critical' })
    expect(useAppStore.getState().insights[0].priority).toBe('critical')
    useAppStore.getState().deleteInsight('1')
    expect(useAppStore.getState().insights).toHaveLength(0)
  })

  it('add/update/delete pain point', () => {
    const p: PainPoint = { id: '1', title: 'Slow load', type: 'performance', frequency: 5, severity: 'high', interviews: ['i1', 'i2'] }
    useAppStore.getState().addPainPoint(p)
    useAppStore.getState().updatePainPoint('1', { frequency: 8 })
    expect(useAppStore.getState().painPoints[0].frequency).toBe(8)
    useAppStore.getState().deletePainPoint('1')
    expect(useAppStore.getState().painPoints).toHaveLength(0)
  })

  it('error handling', () => {
    useAppStore.getState().setError('err')
    expect(useAppStore.getState().error).toBe('err')
  })

  it('reset', () => {
    const i: Interview = { id: '1', participant: 'A', status: 'scheduled', date: '2026-01-01' }
    useAppStore.getState().addInterview(i)
    useAppStore.getState().reset()
    expect(useAppStore.getState().interviews).toHaveLength(0)
  })
})