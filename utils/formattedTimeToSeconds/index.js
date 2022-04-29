export default (time) => {
  const [hrs, mns] = time.split(':')

  return +hrs * 3600 + +mns * 60
}
