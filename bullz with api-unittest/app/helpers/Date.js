/*
*   Date.js
*
*   Date helper functions
*/

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Получить дату сегодня по частям
  |--------------------------------------------------------------------------
  */
  GetDateInParts: function () {
    let d     = new Date()
    let day   = d.getDate()
    let month = d.getMonth() + 1
    let year  = d.getFullYear()
    let min   = d.getMinutes()
    let hours = d.getHours()

    if (min < 10) { min = '0' + min }
    if (hours < 10) { hours = '0' + hours }
    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    partTime = {
      day: day,
      month: month,
      year: year,
      min: min,
      hour: hours,
      date: `${day}-${month}-${year}`,
      date_rev: `${year}-${month}-${day}`,
      time: hours + ':' + min
    }

    return partTime
  }

}
