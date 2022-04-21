import timePeriodToSeconds from '../timePeriodToSeconds/index.mjs'

export default (currentTime, period) => {
  const [start, end] = period.split(' - ')

  return (
    timePeriodToSeconds(start) <= timePeriodToSeconds(currentTime) &&
    timePeriodToSeconds(currentTime) <= timePeriodToSeconds(end)
  )
}
