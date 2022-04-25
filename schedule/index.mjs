import checkIfCurrentTimeInSomePeriod from '../utils/checkIfCurrentTimeInSomePeriod/index.mjs'
import formattedTimeToSeconds from '../utils/formattedTimeToSeconds/index.mjs'
import db from '../schedule/db.mjs'

export class ScheduleError extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'ScheduleError'
  }
}

export const getCurrentPair = (group, currentDay, currentTime) => {
  const schedule = db.schedules.find((schedule) => schedule.groupId === group.id)
  const pairIdsToday = schedule.days[currentDay]

  if (typeof pairIdsToday === 'undefined')
    throw new ScheduleError('На цей день не заплановано жодної пари для ' + group.name)

  const pairsToday = pairIdsToday.map((pairId) => db.pairs.find(({ id }) => pairId === id))
  const pairNow = pairsToday.find((pair) => checkIfCurrentTimeInSomePeriod(currentTime, pair.time))

  if (typeof pairNow === 'undefined') throw new ScheduleError('Зараз пара не йде')

  return getPairInfoByPairId(pairNow.id)
}

const getPairInfoByPairId = (pairId) => {
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

export const getNearestPair = (group, currentDay, currentTime) => {
  const schedule = db.schedules.find((schedule) => schedule.groupId === group.id)
  const currentTimeInSeconds = formattedTimeToSeconds(currentTime)

  let dayIndex = currentDay
  const pairIdsToday = schedule.days[dayIndex]

  if (typeof pairIdsToday !== 'undefined') {
    const pairsToday = pairIdsToday.map((id) => db.pairs.find((pair) => pair.id === id))

    const firstPair = pairsToday[0]
    const lastPair = pairsToday[pairsToday.length - 1]

    const currentTimeSeconds = formattedTimeToSeconds(currentTime)
    const firstPairBeginSeconds = formattedTimeToSeconds(firstPair.time.split('-')[0])
    const lastPairBeginSeconds = formattedTimeToSeconds(lastPair.time.split('-')[0])

    // we are before pairs(currentTime < ) - return first pair of today
    if (currentTimeSeconds < firstPairBeginSeconds) {
      return getPairInfoByPairId(firstPair.id)
    }
    // we are after pairs - return first pair of nextDay
    else if (currentTimeSeconds >= lastPairBeginSeconds) {
      return getPairInfoByPairId(findNextDayFirstPairId(dayIndex, schedule))
    }
    // we are in time with pairs return pair after that
    else {
      const pair = pairsToday.find(({ time }) => checkIfCurrentTimeInSomePeriod(currentTime, time))

      // If we have a pair - return next pair
      if (typeof pair !== 'undefined') {
        return getPairInfoByPairId(pairIdsToday[pairIdsToday.indexOf(pair.id) + 1])
      }
      // If time is in gap -  return first pair, start time of that more than our time
      else {
        return getPairInfoByPairId(
          pairsToday.find(({ time }) => currentTimeInSeconds < time.split('-')[0])
        )
      }
    }
  } else {
    return getPairInfoByPairId(findNextDayFirstPairId(dayIndex, schedule))
  }
}
