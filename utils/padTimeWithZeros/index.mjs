const pad = (amount) => (amount < 10 ? '0' + amount : amount)

export default (time) => {
  return time
    .split(':')
    .map((tt) => pad(tt))
    .join(':')
}
