import db from '../../db.js'
import { getNearestPair } from '../../index.js'

const testGroup = db.groups[0]

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

  it("Returns first pair of next day if it is an end of this day or it's a gap in the schedule", () => {
    const currentDay = 0
    const currentTime = '12:10'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Среда - 1 пара',
      place: '113',
      teacherName: 'Герасименко Оксана Юріївна',
    })
  })

  it('Returns the next day, first pair if today is no pairs ', () => {
    const currentDay = 1
    const currentTime1 = '13:00'
    const currentTime2 = '17:35'

    expect(getNearestPair(testGroup, currentDay, currentTime1)).toEqual({
      name: 'Среда - 1 пара',
      place: '113',
      teacherName: 'Герасименко Оксана Юріївна',
    })

    expect(getNearestPair(db.groups[1], currentDay, currentTime2)).toEqual({
      name: 'Среда - 1 пара',
      place: '113',
      teacherName: 'Герасименко Оксана Юріївна',
    })
  })

  it("Returns the next day, first pair if it's end of the day", () => {
    const currentDay = 2
    const currentTime = '15:10'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Четверг - 1 пара',
      place: '113',
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

  it('Returns the first pair of second day if it is no pairs in first', () => {
    const testGroup = db.groups[1]
    const currentDay1 = 0
    const currentTime1 = '11:10'

    expect(getNearestPair(testGroup, currentDay1, currentTime1)).toEqual({
      name: 'Вторник - 1 пара',
      place: '211',
      teacherName: 'Герасименко Оксана Юріївна',
    })
  })

  it('Returns the next pair of this day if it is a gap between pairs now', () => {
    const currentDay = 0
    const currentTime = '12:00'

    expect(getNearestPair(testGroup, currentDay, currentTime)).toEqual({
      name: 'Понедельник - 3 пара',
      place: 'https://us04web.zoom.us/j/74357958497?pwd=ZF1f25FvTHS3G5BIQDTMb3myYU3PUW.1',
      teacherName: 'Телешун Ярослав С.',
    })
  })

  it('Returns the first pair of first day if it is no pairs today', () => {
    const currentDay1 = 4
    const currentDay2 = 5
    const currentDay3 = 6
    const currentTime1 = '6:10'
    const currentTime2 = '11:10'
    const currentTime3 = '11:10'

    expect(getNearestPair(testGroup, currentDay1, currentTime1)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })

    expect(getNearestPair(testGroup, currentDay2, currentTime2)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })

    expect(getNearestPair(testGroup, currentDay3, currentTime3)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })
})
