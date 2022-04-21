import checkIfCurrentTimeInSomePeriod from '../utils/checkIfCurrentTimeInSomePeriod/index.mjs'
import timePeriodToSeconds from '../utils/timePeriodToSeconds/index.mjs'

export class ScheduleError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'ScheduleError'
  }
}

export const getCurrentPair = (group, currentDay, currentTime, db) => {
  const schedule = db.schedules.find((schedule) => schedule.groupId === group.id)
  const day = schedule.days[currentDay]

  if (typeof day === 'undefined')
    throw new ScheduleError('На цей день не заплановано жодної пари для ' + group.name)

  const { subjectId } =
    day
      .map((pairId) => db.pairs.find(({ id }) => pairId === id)) // Каждый айдишник пары сопоставляем с самой парой из БД
      .find((pair) => checkIfCurrentTimeInSomePeriod(currentTime, pair.time)) || {} // Находим наконец пару и забираем её в переменную subjectId

  if (typeof subjectId === 'undefined') throw new ScheduleError('На сьогодні пари скінчилися')

  const subject = db.subjects.find((subj) => subj.id === subjectId)

  if (typeof subject === 'undefined')
    throw new Error('Trying to find unknown subject. See more in db.subjects')

  const { name, place, teacherId } = db.subjects.find((subj) => subj.id === subjectId)
  const teacherName = db.teachers.find((teacher) => teacher.id === teacherId).name

  return {
    name,
    place,
    teacherName,
  }
}

const getPairInfoByPairId = (pairId, db) => {
  const { subjectId } = db.pairs.find(({ id }) => id === pairId)
  const { name, place, teacherId } = db.subjects.find(({ id }) => id === subjectId)
  const teacherName = db.teachers.find(({ id }) => id === teacherId).name

  return { name, place, teacherName }
}

export const getNearestPair = (group, currentDay, currentTime, db) => {
  const schedule = db.schedules.find((schedule) => schedule.groupId === group.id)

  let dayIndex = currentDay

  if (schedule.days[dayIndex]) {
    const pairs = schedule.days[dayIndex].map((pairId) =>
      db.pairs.find((pair) => pair.id === pairId),
    )

    const pair = pairs.find(({ time }) => checkIfCurrentTimeInSomePeriod(currentTime, time))

    //Нужно проверить если время до того, как начнется пара и если время после того, как закончится пара
    if (pair === undefined) {
      let pairId = schedule.days[dayIndex][0]

      const [timeOfFirstPair] = db.pairs.find(({ id }) => id === pairId).time.split('-')

      if (timePeriodToSeconds(currentTime) > timePeriodToSeconds(timeOfFirstPair)) {
        dayIndex = (dayIndex + 1) % schedule.days.length

        while (typeof schedule.days[dayIndex][0] === 'undefined') {
          dayIndex = (dayIndex + 1) % schedule.days.length
        }

        pairId = schedule.days[dayIndex][0]
      }

      return getPairInfoByPairId(pairId, db)
    }

    const presentDay = schedule.days[dayIndex]
    const nextPairId = presentDay[presentDay.indexOf(pair.id) + 1]

    return getPairInfoByPairId(nextPairId, db)
  }
}
