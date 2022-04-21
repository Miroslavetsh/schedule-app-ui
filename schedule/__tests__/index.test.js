import { getCurrentPair, getNearestPair, ScheduleError } from '../index.mjs'

const db = {
  subjects: [
    {
      id: 'test-subject-id',
      name: 'Test-Subj',
      place: '114',
      teacherId: 'test-teacher-id',
    },
    {
      id: 'test-subject-id-for-current-day-before-pairs',
      name: 'Test-Subj Before First Pair',
      place: '114',
      teacherId: 'test-teacher-id',
    },
    {
      id: 'test-subject-id-special',
      name: 'Test-Subj-Spec',
      place: '201',
      teacherId: 'test-teacher-id-spec',
    },
  ],
  teachers: [
    { id: 'test-teacher-id', name: 'Test Test Test' },
    { id: 'test-teacher-id-spec', name: 'Test Test Spec' },
  ],
  groups: [{ id: 'test-group-id', name: 'Test Group' }],
  schedules: [
    {
      id: 1,
      groupId: 'test-group-id',
      days: [
        [5, 2, 3, 4],
        [1, 2, 3, 4],
      ],
    },
  ],
  pairs: [
    {
      id: 1,
      subjectId: 'test-subject-id',
      time: '09:00 - 10:20',
    },
    {
      id: 2,
      subjectId: 'test-subject-id',
      time: '10:30 - 11:09',
    },
    {
      id: 3,
      subjectId: 'test-subject-id-special',
      time: '11:10 - 11:50',
    },
    {
      id: 4,
      subjectId: 'test-subject-id',
      time: '12:10 - 12:49',
    },
    {
      id: 5,
      subjectId: 'test-subject-id-for-current-day-before-pairs',
      time: '09:00 - 10:20',
    },
  ],
  days: [
    { id: 1, name: 'Понеділок' },
    { id: 2, name: 'Вівторок' },
    { id: 3, name: 'Середа' },
    { id: 4, name: 'Четвер' },
    { id: 5, name: "П'ятниця" },
    { id: 6, name: 'Субота' },
    { id: 7, name: 'Неділя' },
  ],
}

describe('getCurrentPair works', () => {
  it("Returns a pair if it's defined", () => {
    const currentDay = 0
    const currentTime = '11:39'

    expect(getCurrentPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Test-Subj-Spec',
      place: '201',
      teacherName: 'Test Test Spec',
    })
  })

  it('Throws a ScheduleError when is NO ONE pair for current day', () => {
    const currentDay = 4
    const currentTime = '11:39'

    expect(() => {
      getCurrentPair(db.groups[0], currentDay, currentTime, db)
    }).toThrowError(
      new ScheduleError('На цей день не заплановано жодної пари для ' + db.groups[0].name)
    )
  })

  it('Throws a ScheduleError when is NO MORE pairs for current day', () => {
    const currentDay = 0
    const currentTime = '19:39'

    expect(() => {
      getCurrentPair(db.groups[0], currentDay, currentTime, db)
    }).toThrowError(new ScheduleError('На сьогодні пари скінчилися'))
  })
})

describe('getNearestPair works', () => {
  it('Returns a next pair of present day if we have pair after current time', () => {
    const currentDay = 0
    const currentTime = '10:00'

    expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Test-Subj',
      place: '114',
      teacherName: 'Test Test Test',
    })
  })

  it('Returns a first pair of a next day if we have day after current one', () => {
    const currentDay = 0
    const currentTime = '18:39'

    expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Test-Subj',
      place: '114',
      teacherName: 'Test Test Test',
    })
  })

  it('Returns a first pair of a current day, cause the current time is before pairs', () => {
    const currentDay = 0
    const currentTime = '08:39'

    expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Test-Subj Before First Pair',
      place: '114',
      teacherName: 'Test Test Test',
    })
  })

  it('Returns a first pair of a next day with at least one pair (no pairs today anymore', () => {
    const currentDay = 1
    const currentTime = '18:19'

    expect(getNearestPair(db.groups[0], currentDay, currentTime, db)).toEqual({
      name: 'Test-Subj Before First Pair',
      place: '114',
      teacherName: 'Test Test Test',
    })
  })
})
