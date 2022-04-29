import formattedTimeToSeconds from '../formattedTimeToSeconds/index.js'

export default (currentTime, period) => {
  const [start, end] = period.split(' - ')

  return (
    formattedTimeToSeconds(start) <= formattedTimeToSeconds(currentTime) &&
    formattedTimeToSeconds(currentTime) <= formattedTimeToSeconds(end)
  )
}
