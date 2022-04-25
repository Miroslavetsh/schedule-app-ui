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

  if (typeof subjectId === 'undefined') throw new ScheduleError('Зараз пара не йде')

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

const findNextDayFirstPairId = (dayIndex, schedule) => {
  dayIndex = (dayIndex + 1) % schedule.days.length

  while (typeof schedule.days[dayIndex][0] === 'undefined') {
    dayIndex = (dayIndex + 1) % schedule.days.length
  }

  return schedule.days[dayIndex][0]
}

export const getNearestPair = (group, currentDay, currentTime, db) => {
  const schedule = db.schedules.find((schedule) => schedule.groupId === group.id)
  const currentTimeInSeconds = timePeriodToSeconds(currentTime)

  let dayIndex = currentDay
  const pairIdsToday = schedule.days[dayIndex]

  if (typeof pairIdsToday !== 'undefined') {
    const pairsToday = pairIdsToday.map((id) => db.pairs.find((pair) => pair.id === id))

    const firstPair = pairsToday[0]
    const lastPair = pairsToday[pairsToday.length - 1]

    const currentTimeSeconds = timePeriodToSeconds(currentTime)
    const firstPairBeginSeconds = timePeriodToSeconds(firstPair.time.split('-')[0])
    const lastPairBeginSeconds = timePeriodToSeconds(lastPair.time.split('-')[0])

    console.log(firstPair)
    console.log(lastPair)

    // we are before pairs(currentTime < ) - return first pair of today
    if (currentTimeSeconds < firstPairBeginSeconds) {
      return getPairInfoByPairId(firstPair.id, db)
    }
    // we are after pairs - return first pair of nextDay
    else if (currentTimeSeconds >= lastPairBeginSeconds) {
      return getPairInfoByPairId(findNextDayFirstPairId(dayIndex, schedule), db)
    }
    // we are in time with pairs return pair after that
    else {
      const pair = pairsToday.find(({ time }) => checkIfCurrentTimeInSomePeriod(currentTime, time))

      console.log(pair)
      // If we have a pair - return next pair
      if (typeof pair !== 'undefined') {
        return getPairInfoByPairId(pairIdsToday[pairIdsToday.indexOf(pair.id) + 1], db)
      }
      // Если время в переыве -  return firstPair, start time of that more than our time
      else {
        return getPairInfoByPairId(
          pairsToday.find(({ time }) => currentTimeInSeconds < time.split('-')[0]),
          db
        )
      }
    }
  } else {
    return getPairInfoByPairId(findNextDayFirstPairId(dayIndex, schedule), db)
  }

  // const pairs = schedule.days[dayIndex].map((pairId) => db.pairs.find((pair) => pair.id === pairId))

  // const currentPair = pairs.find(({ time }) => checkIfCurrentTimeInSomePeriod(currentTime, time))
  // const lastPair = pairs[pairs.length - 1]

  // const weAreInTimeBeforeTheLastPair = lastPair
  //   ? timePeriodToSeconds(lastPair.time.split('-')[1]) > currentTimeInSeconds
  //   : false

  // //Нужно проверить если время до того, как начнется пара и если время после того, как закончится пара
  // if (typeof currentPair === 'undefined' && weAreInTimeBeforeTheLastPair) {
  //   let pairId = schedule.days[dayIndex][0]

  //   const [timeOfFirstPair] = db.pairs.find(({ id }) => id === pairId).time.split('-')

  //   if (currentTimeInSeconds > timePeriodToSeconds(timeOfFirstPair)) {

  //     pairId = schedule.days[dayIndex][0]
  //   }
  //   return getPairInfoByPairId(pairId, db)
  // }

  // const presentDay = schedule.days[dayIndex]
  // let nextPairId = presentDay[presentDay.indexOf(pair.id) + 1]

  // if (presentDay.indexOf(pair.id) + 1 === presentDay.length) {
  //   const nextDayIndex = dayIndex + 1
  //   const nextDay = schedule.days[nextDayIndex]

  //   nextPairId = nextDay[0]

  //   return getPairInfoByPairId(nextPairId, db)
  // }

  // return getPairInfoByPairId(nextPairId, db)
}
