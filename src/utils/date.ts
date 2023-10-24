export function getCurrentTimeISOString(): string {
  const date = new Date()
  const timeZoneOffset = date.getTimezoneOffset() / 60
  date.setHours(date.getHours() - timeZoneOffset)
  return date.toISOString()
}
