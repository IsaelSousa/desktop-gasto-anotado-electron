export const DateFormater = (date: Date) => {
  const dateFormat = new Date(date)
  return `${String(dateFormat.getDate() + 1).padStart(2, '0')}/${String(dateFormat.getMonth() + 1).padStart(2, '0')}/${String(dateFormat.getFullYear()).padStart(2, '0')}`
}
