import timePeriodToSeconds from '../index.mjs'

describe('timePeriodToSeconds works', () => {
  it('Passes a simple time equality', () => {
    expect(timePeriodToSeconds('00:00')).toBe(0)
  })

  it('Passes a simple time equality', () => {
    expect(timePeriodToSeconds('23:59')).toBe(86340)
  })
})
