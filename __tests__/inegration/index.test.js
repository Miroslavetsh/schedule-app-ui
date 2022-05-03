import main from '../../main.js'

describe('App works correctly', () => {
  it('View shows us current day', () => {
    expect(main('djsaFnGDLk727uiogu3i710gDDA9GhdLIk', 0, '09:00').currentDay).toBe
  })

  it('View shows us current time', () => {
    expect(main('djsaFnGDLk727uiogu3i710gDDA9GhdLIk', 0, '09:00').currentTime).toBe
  })
})
