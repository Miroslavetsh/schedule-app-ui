import db from './schedule/db.js'
import { ScheduleError, getCurrentPair, getNearestPair } from './schedule/index.js'

const main = (_TOKEN_) => {
  const currentDay = new Date().getDay() - 1
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`

  const group = db.groups.find((group) => group.id === _TOKEN_)
  if (typeof group === 'undefined') throw new ScheduleError('За заданим токеном групи не знайдено')

  const view = {
    groupName: group.name,
  }

  try {
    view.currentPair = { ...getCurrentPair(group, currentDay, currentTime) }
  } catch (err) {
    if (err.name === 'ScheduleError') view.currentPair = err.message
    else console.warn(err)
  }

  try {
    view.nearestPair = { ...getNearestPair(group, currentDay, currentTime) }
  } catch (err) {
    if (err.name === 'ScheduleError') view.nearestPair = err.message
    else console.warn(err)
  }

  return view
}

export default main
