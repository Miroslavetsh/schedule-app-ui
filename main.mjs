import db from './schedule/db.mjs'
import { ScheduleError, getCurrentPair, getNearestPair } from './schedule/index.mjs'

//===============-= Main =-===============//

const main = () => {
  const _TOKEN_ = 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk'
  
  const currentDay = new Date().getDay() - 1
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`

  const group = db.groups.find((group) => group.id === _TOKEN_)
  if (typeof group === 'undefined') throw new ScheduleError('За заданим токеном групи не знайдено')

  const view = {}

  // найдём текущую пару
  try {
    view.currentPair = { ...getCurrentPair(group, currentDay, currentTime, db) }
  } catch (err) {
    if (err.name === 'ScheduleError') view.currentPair = err.message
  }
  
  // найдём следующую ближайшую пару (можно построить односвязный список из графика и пройтись)
  view.nearestPair = { ...getNearestPair(group, currentDay, currentTime, db) }

  return view
}

console.log(main())
