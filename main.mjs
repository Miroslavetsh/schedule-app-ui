import db from './schedule/db.mjs'
import { ScheduleError, getCurrentPair, getNearestPair } from './schedule/index.mjs'

//===============-= Main =-===============//

const main = () => {
  const _TOKEN_ = 'djsaFnGDLk727uiogu3i710gDDA9GhdLIk'

  // TODO: Перенести это в тесты функции getNearestPair
  // они пока закомментированы путь: schedule/__tests__index.test.js

  const currentDay = new Date().getDay() - 1
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`

  // Утро понедельника (до пар)

  // const currentDay = 0
  // const currentTime = '08:00'
  // current pair - Зараз пара не йде
  // nearest pair - Первая пара понедельника

  // Утро понедельника (во время первой пары)+

  // const currentDay = 0
  // const currentTime = '09:00'
  // current pair - Понедельник 1 пара
  // nearest pair - Понедельник 2 пара

  // Утро понедельника (во время последней пары) +

  // const currentDay = 0
  // const currentTime = '12:10'
  // current pair - Понедельник 3 пара
  // nearest pair - Вторник 1 пара

  // Четверг (перед парами)+

  // const currentDay = 3
  // const currentTime = '07:10'
  // current pair - Пара не йде
  // nearest pair - Четверг 1 пара

  // Четверг (после пар) +

  // const currentDay = 3
  // const currentTime = '14:10'
  // current pair - Зараз пара не йде
  // nearest pair - Понедельник 1 пара

  // Четверг (время 2-й пары) +

  // const currentDay = 3
  // const currentTime = '11:10'
  // current pair - Четверг 2 пара
  // nearest pair - Четверг 3 пара

  // Четверг (время последняя пара) +

  // const currentDay = 3
  // const currentTime = '12:10'
  // current pair - Четверг 3 пара
  // nearest pair - Понеділок 1 пара

  const group = db.groups.find((group) => group.id === _TOKEN_)
  if (typeof group === 'undefined') throw new ScheduleError('За заданим токеном групи не знайдено')

  const view = {
    currentDay: db.days[currentDay].name,
    currentTime,
  }

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
