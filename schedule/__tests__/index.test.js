import db from '../db.mjs'
import { getCurrentPair, getNearestPair, ScheduleError } from '../index.mjs'

const testGroup = db.groups[0]

describe('getCurrentPair works', () => {
  it("Returns a pair in morning if it's defined", () => {
    const currentDay = 0
    const currentTime = '09:00'

    expect(getCurrentPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it("Returns a pair in noon if it's defined", () => {
    const currentDay = 0
    const currentTime = '11:39'

    expect(getCurrentPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 2 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it("Returns the last pair if it's defined", () => {
    const currentDay = 0
    const currentTime = '12:20'

    expect(getCurrentPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 3 пара',
      place: 'https://us04web.zoom.us/j/74357958497?pwd=ZF1f25FvTHS3G5BIQDTMb3myYU3PUW.1',
      teacherName: 'Телешун Ярослав С.',
    })
  })

  it('Throws a ScheduleError when is NO ONE pair for current day', () => {
    const currentDay = 4 // Friday, cause every day counts from 0 (zero is monday)
    const currentTime = '11:39'

    expect(() => {
      getCurrentPair(testGroup, currentDay, currentTime)
    }).toThrowError(
      new ScheduleError('На цей день не заплановано жодної пари для ' + testGroup.name)
    )
  })

  it('Throws a ScheduleError when NONE of pairs for current time', () => {
    const currentDay = 0

    expect(() => {
      getCurrentPair(testGroup, currentDay, '08:00')
    }).toThrowError(new ScheduleError('Зараз пара не йде'))

    expect(() => {
      getCurrentPair(testGroup, currentDay, '15:00')
    }).toThrowError(new ScheduleError('Зараз пара не йде'))
  })

  it('Throws a ScheduleError when it is a gap between pairs in current time', () => {
    const currentDay = 0

    expect(() => {
      getCurrentPair(testGroup, currentDay, '10:21')
    }).toThrowError(new ScheduleError('Зараз пара не йде'))
  })
})

describe('getNearestPair works', () => {
  it('Returns first pair of current day when time is before pairs', () => {
    const currentDay = 0
    const currentTime = '08:00'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it('Returns second pair of current day if it is time of first pair', () => {
    const currentDay = 0
    const currentTime = '09:00'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 2 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it('Returns first pair of next day if it is an end of this day', () => {
    const currentDay = 0
    const currentTime = '12:10'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Вторник - 1 пара',
      place: '211',
      teacherName: 'Герасименко Оксана Юріївна',
    })
  })

  it('Returns first pair of first day if it is an end of the studying week', () => {
    const currentDay = 3
    const currentTime = '14:10'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it('Returns first pair of first day if it is a last pair of the end of the studying week', () => {
    const currentDay = 3
    const currentTime = '12:10'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it('Returns the last pair of a last day if it is time for another pair', () => {
    const currentDay = 3
    const currentTime = '11:10'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Четверг - 3 пара',
      place: '113',
      teacherName: 'Герасименко Оксана Юріївна',
    })
  })
})
