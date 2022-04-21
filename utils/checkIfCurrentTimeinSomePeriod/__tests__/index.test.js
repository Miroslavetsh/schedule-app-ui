import checkIfCurrentTimeInSomePeriod from '../index.mjs'

describe('checkIfCurrentTimeInSomePeriod function works', () => {
  it('Returns TRUE if time is between start and end of period', () => {
    const time = '09:10'
    const period = '09:00 - 10:20'

    expect(checkIfCurrentTimeInSomePeriod(time, period)).toEqual(true)
  })

  it('Returns FALSE if time less than start', () => {
    const time = '08:10'
    const period = '09:00 - 10:20'

    expect(checkIfCurrentTimeInSomePeriod(time, period)).toEqual(false)
  })

  it('Returns FALSE if time more than end', () => {
    const time = '12:10'
    const period = '09:00 - 10:20'

    expect(checkIfCurrentTimeInSomePeriod(time, period)).toEqual(false)
  })
})
