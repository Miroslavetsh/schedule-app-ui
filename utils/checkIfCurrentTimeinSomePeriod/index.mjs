import formattedTimeToSeconds from '../formattedTimeToSeconds/index.mjs'

export default (currentTime, period) => {
  const [start, end] = period.split(' - ')

  return (
    formattedTimeToSeconds(start) <= formattedTimeToSeconds(currentTime) &&
    formattedTimeToSeconds(currentTime) <= formattedTimeToSeconds(end)
  )
}
