import padTimeWithZeros from '../index.mjs'

describe('Util padTimeWithZeros works', () => {
  it('Pads a non-full time', () => {
    expect(padTimeWithZeros('11:2:5')).toEqual('11:02:05')
  })

  it("Doesn't pad a fully one", () => {
    expect(padTimeWithZeros('11:12:15')).toEqual('11:12:15')
  })
})
