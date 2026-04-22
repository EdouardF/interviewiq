import { describe, it, expect } from 'vitest'
import { INTERVIEW_STATUS_LABELS, PRIORITY_LABELS, PAINPOINT_LABELS, formatDate, formatDuration, filterInterviews, sortInterviews } from '../utils/helpers'
import type { Interview } from '../types'

const sampleInterviews: Interview[] = [
  { id: '1', participant: 'Alice', status: 'analyzed', date: '2026-01-15', duration: 60 },
  { id: '2', participant: 'Bob', status: 'scheduled', date: '2026-02-01' },
  { id: '3', participant: 'Charlie', status: 'recording', date: '2026-03-10', duration: 45 },
]

describe('helpers', () => {
  it('INTERVIEW_STATUS_LABELS', () => { expect(INTERVIEW_STATUS_LABELS.analyzed).toBe('Analyzed') })
  it('PRIORITY_LABELS', () => { expect(PRIORITY_LABELS.critical).toBe('Critical') })
  it('PAINPOINT_LABELS', () => { expect(PAINPOINT_LABELS.usability).toBe('Usability') })
  it('formatDate valid', () => { expect(formatDate('2026-04-22')).toBeTruthy() })
  it('formatDate invalid', () => { expect(formatDate('bad')).toBe('bad') })
  it('formatDuration', () => { expect(formatDuration(125)).toBe('2h 5m') })
  it('formatDuration short', () => { expect(formatDuration(30)).toBe('0h 30m') })

  describe('filterInterviews', () => {
    it('filter by status', () => { expect(filterInterviews(sampleInterviews, 'analyzed')).toHaveLength(1) })
    it('filter by query', () => { expect(filterInterviews(sampleInterviews, undefined, 'alice')).toHaveLength(1) })
    it('no filter returns all', () => { expect(filterInterviews(sampleInterviews)).toHaveLength(3) })
  })

  describe('sortInterviews', () => {
    it('sort by date newest first', () => { expect(sortInterviews(sampleInterviews, 'date')[0].id).toBe('3') })
    it('sort by participant name', () => { expect(sortInterviews(sampleInterviews, 'participant')[0].participant).toBe('Alice') })
  })
})