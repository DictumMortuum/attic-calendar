'use strict';

const sunset = require('./sunset');
const re = /(\d+) (\d+)-<br>(\d+)-(\d+)\/(\d+)-?(\d+)?/;

module.exports = ({summary}) => {
  let [
    _,
    attic_day,
    year,
    month,
    day,
    day_end,
    month_end
  ] = re.exec(summary);

  let today = new Date(year + '-' + month + '-' + day);
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  let {sunset: today_sunset} = sunset(today);
  let {sunset: tomorrow_sunset} = sunset(tomorrow);

  return {
    attic_day: parseInt(attic_day),
    attic_day_start: today_sunset,
    attic_day_end: tomorrow_sunset,
    attic_month: "",
    gregorian_year: year,
    gregorian_month: month,
    gregorian_day: day,
    gregorian_month_end: month_end || month,
    gregorian_day_end: day_end,
    hmepa_festival: [],
    hmepa_moon: "",
    hmepa_moon_phase: "",
    moon_event: ""
  };
}
