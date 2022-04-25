import db from './schedule/db.mjs'
import { ScheduleError, getCurrentPair, getNearestPair } from './schedule/index.mjs'
import padTimeWithZeros from './utils/padTimeWithZeros/index.mjs'

const main = (_TOKEN_ = 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk') => {
  const currentDay = new Date().getDay() - 1
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`

  const group = db.groups.find((group) => group.id === _TOKEN_)
  if (typeof group === 'undefined') throw new ScheduleError('За заданим токеном групи не знайдено')

  const view = {
    currentDay: db.days[currentDay].name,
    currentTime: padTimeWithZeros(currentTime),
  }

  try {
    view.currentPair = { ...getCurrentPair(group, currentDay, currentTime) }
  } catch (err) {
    if (err.name === 'ScheduleError') view.currentPair = err.message
    else console.warn(err)
  }

  view.nearestPair = { ...getNearestPair(group, currentDay, currentTime) }

  return view
}

console.log(main())

export default main
