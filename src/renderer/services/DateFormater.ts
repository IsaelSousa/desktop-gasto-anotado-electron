export const DateFormater = (date: Date) => {
  const dateFormat = new Date(date);
  const day = String(dateFormat.getDate() + 1).padStart(2, '0');
  const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
  const year = String(dateFormat.getFullYear()).padStart(2, '0');
  return `${day}/${month}/${year}`
}

export const DateTimeFormater = (date: Date) => {
  const dateFormat = new Date(date);
  const day = String(dateFormat.getDate() + 1).padStart(2, '0');
  const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
  const year = String(dateFormat.getFullYear()).padStart(2, '0');
  const hour =String(dateFormat.getHours()).padStart(2, '0');
  const minute = String(dateFormat.getMinutes()).padStart(2, '0');
  const seconds = String(dateFormat.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hour}:${minute}:${seconds}`
}
