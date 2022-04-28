import main from '../../main.mjs'

describe('App works correctly', () => {
  it('View shows us current day', () => {
    expect(main('djsaFnGDLk727uiogu3i710gDDA9GhdLIk').currentDay).toBe
  })

  it('View shows us current time', () => {
    expect(main('djsaFnGDLk727uiogu3i710gDDA9GhdLIk').currentTime).toBe
  })
})
