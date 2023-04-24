export const DateToString = (month: number) => {
  if (month === 1) {
    return 'Janeiro'
  } else if (month === 2) {
    return 'Fevereiro'
  } else if (month === 3) {
    return 'Março'
  } else if (month === 4) {
    return 'Abril'
  } else if (month === 5) {
    return 'Maio'
  } else if (month === 6) {
    return 'Junho'
  } else if (month === 7) {
    return 'Julho'
  } else if (month === 8) {
    return 'Agosto'
  } else if (month === 9) {
    return 'Setembro'
  } else if (month === 10) {
    return 'Outubro'
  } else if (month === 11) {
    return 'Novembro'
  } else if (month === 12) {
    return 'Dezembro'
  } else {
    return '';
  }
}
