import isLink from '../index'

describe('Util isLink works', () => {
  it('Start with https but not correct', () => {
    expect(isLink('https/google.com')).toEqual(false)
  })

  it('Correct link', () => {
    expect(isLink('https://www.google.com/')).toEqual(true)
  })

  it('Room number', () => {
    expect(isLink('114')).toEqual(false)
  })

  it('Empty string', () => {
    expect(isLink('')).toEqual(false)
  })
})
