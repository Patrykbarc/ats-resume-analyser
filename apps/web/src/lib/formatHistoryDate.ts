import { format } from 'date-fns'

export const formatHistoryDate = (date: Date) => {
  return format(date, 'PPp')
}
