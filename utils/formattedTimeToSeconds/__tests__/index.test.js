import formattedTimeToSeconds from '../index.mjs'

describe('formattedTimeToSeconds works', () => {
  it('Passes a simple time equality', () => {
    expect(formattedTimeToSeconds('00:00')).toBe(0)
  })

  it('Passes a complex time equality', () => {
    expect(formattedTimeToSeconds('23:59')).toBe(86340)
  })
})
