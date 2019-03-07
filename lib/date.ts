import { format } from 'date-fns'

export function toISODateString(date: Date): string {
  return format(date, 'YYYY-MM-DD')
}