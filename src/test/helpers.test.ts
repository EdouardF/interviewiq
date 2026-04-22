import { describe, it, expect } from 'vitest'
import { INTERVIEW_STATUS_LABELS, PRIORITY_LABELS, PAINPOINT_LABELS, formatDate, formatDuration, generateId } from '../utils/helpers'

describe('helpers', () => {
  it('INTERVIEW_STATUS_LABELS', () => { expect(INTERVIEW_STATUS_LABELS.scheduled).toBe('Scheduled'); expect(INTERVIEW_STATUS_LABELS.analyzed).toBe('Analyzed') })
  it('PRIORITY_LABELS', () => { expect(PRIORITY_LABELS.critical).toBe('Critical') })
  it('PAINPOINT_LABELS', () => { expect(PAINPOINT_LABELS.usability).toBe('Usability'); expect(PAINPOINT_LABELS.feature_gap).toBe('Feature Gap') })
  it('formatDate valid', () => { expect(formatDate('2026-04-22')).toBeTruthy() })
  it('formatDate invalid', () => { expect(formatDate('bad')).toBe('bad') })
  it('formatDuration', () => { expect(formatDuration(75)).toBe('1h 15m') })
  it('generateId unique', () => { expect(new Set(Array.from({ length: 10 }, () => generateId())).size).toBe(10) })
})