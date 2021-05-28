import { format, isAfter, isToday } from 'date-fns'

export const formatChatDate = (date: string) => {
  const parsedDate = new Date(date)

  if (isToday(parsedDate)) {
    return format(parsedDate, 'HH:mm')
  } else {
    const todayOfWeek = new Date()
    const sevenDaysBefore = new Date(todayOfWeek).setDate(
      todayOfWeek.getDate() - 6
    )

    if (isAfter(todayOfWeek, sevenDaysBefore)) {
      return format(parsedDate, 'eee')
    } else {
      return format(parsedDate, 'dd/MM/yyyy')
    }
  }
}

export const formatHour = (date: string) => {
  return format(new Date(date), 'HH:mm')
}
