function format(date) {
  const pad = (n) => (n < 10 ? `0${n}` : n)
  return `${pad(date.getDate())}/${pad(date.getMonth())}/${pad(
    date.getFullYear()
  )}`
}

module.exports = { format }
