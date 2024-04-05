export const formatDate = (dateString: string | undefined) => {
  if (!dateString) {
    return ''
  }
  const date = new Date(dateString)

  const options = { weekday: 'short' as const }
  const dayOfWeek = date.toLocaleDateString('en-GB', options)

  const dayOfMonth = date.getDate()
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const monthIndex = date.getMonth()
  const monthName = monthNames[monthIndex]

  return `${dayOfWeek}, ${dayOfMonth} ${monthName}`
}

export const formatDateWithTime = (dateString: string | undefined): string => {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const monthIndex = date.getMonth()
  const dayOfMonth = date.getDate()

  let hours = date.getHours()
  const minutes = date.getMinutes()

  const ampm = hours >= 12 ? 'pm' : 'am'

  hours = hours % 12
  hours = hours ? hours : 12

  return `${monthNames[monthIndex]} ${dayOfMonth} at ${hours}:${minutes
    .toString()
    .padStart(2, '0')}${ampm}`
}
