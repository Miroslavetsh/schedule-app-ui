import db from '../db.mjs'
import { getCurrentPair, getNearestPair, ScheduleError } from '../index.mjs'

describe('getCurrentPair works', () => {
  it("Returns a pair in morning if it's defined", () => {
    const currentDay = 0
    const currentTime = '09:00'

    expect(getCurrentPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Понедельник - 1 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it("Returns a pair in noon if it's defined", () => {
    const currentDay = 0
    const currentTime = '11:39'

    expect(getCurrentPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Понедельник - 2 пара',
      place: '114',
      teacherName: 'Миколайчук Роман Антонович',
    })
  })

  it("Returns the last pair if it's defined", () => {
    const currentDay = 0
    const currentTime = '12:20'

    expect(getCurrentPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Понедельник - 3 пара',
      place: 'https://us04web.zoom.us/j/74357958497?pwd=ZF1f25FvTHS3G5BIQDTMb3myYU3PUW.1',
      teacherName: 'Телешун Ярослав С.',
    })
  })

  it('Throws a ScheduleError when is NO ONE pair for current day', () => {
    const currentDay = 4 // Friday, cause every day counts from 0 (zero is monday)
    const currentTime = '11:39'

    expect(() => {
      getCurrentPair(db.groups[0], currentDay, currentTime, db)
    }).toThrowError(
      new ScheduleError('На цей день не заплановано жодної пари для ' + db.groups[0].name)
    )
  })

  it('Throws a ScheduleError when NONE of pairs for current time', () => {
    const currentDay = 0

    expect(() => {
      getCurrentPair(db.groups[0], currentDay, '08:00', db)
    }).toThrowError(new ScheduleError('Зараз пара не йде'))

    expect(() => {
      getCurrentPair(db.groups[0], currentDay, '15:00', db)
    }).toThrowError(new ScheduleError('Зараз пара не йде'))
  })
})

// describe('getNearestPair works', () => {
//   it('Returns a next pair of present day if we have pair after current time', () => {
//     const currentDay = 0
//     const currentTime = '10:00'

//     expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
//       name: 'Test-Subj',
//       place: '114',
//       teacherName: 'Test Test Test',
//     })
//   })

//   it('Returns a first pair of a next day if we have day after current one', () => {
//     const currentDay = 0
//     const currentTime = '18:39'

//     expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
//       name: 'Test-Subj',
//       place: '114',
//       teacherName: 'Test Test Test',
//     })
//   })

//   it('Returns a first pair of a current day, cause the current time is before pairs', () => {
//     const currentDay = 0
//     const currentTime = '08:39'

//     expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
//       name: 'Test-Subj Before First Pair',
//       place: '114',
//       teacherName: 'Test Test Test',
//     })
//   })

//   it('Returns a first pair of a next day with at least one pair (no pairs today anymore', () => {
//     const currentDay = 1
//     const currentTime = '18:19'

//     expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
//       name: 'Test-Subj Before First Pair',
//       place: '114',
//       teacherName: 'Test Test Test',
//     })
//   })
// })
