'use strict';

const sunset = require('./sunset');
const moon = require('./moon');
const festival_re = /Images\/(.*).gif.html/;
const moon_re = /(\d+:\d+) \d+\/\d+/;
const re = /(\d+) (\d+)-<br>(\d+)-(\d+)\/(\d+)-?(\d+)?/;

module.exports = ({
  olympiad: attic_olympiad,
  year: attic_year,
  month: attic_month,
  attr: {summary},
  events
}) => {
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

  let hmepa_festival_types = {};
  let hmepa_festival = events.filter(({alt}) => alt === '')
    .map(({src, type}) => {
      let [_, name] = festival_re.exec(src);
      hmepa_festival_types[name] = type;
      return name;
    });

  let moon_event = events.filter(({alt}) => alt !== '')
    .filter(({text}) => moon_re.test(text))
    .map(({text, alt}) => {
      let [_, hmepa_moon] = moon_re.exec(text);

      return {
        hmepa_moon,
        hmepa_moon_phase: alt,
        moon_event: moon(today_sunset, tomorrow_sunset, alt)[0]
      }
    });

  return {
    attic_day,
    attic_day_start: today_sunset,
    attic_day_end: tomorrow_sunset,
    attic_month,
    attic_year,
    attic_olympiad,
    gregorian_year: year,
    gregorian_month: month,
    gregorian_day: day,
    gregorian_month_end: month_end || month,
    gregorian_day_end: day_end,
    hmepa_festival_types,
    hmepa_festival,
    moon_event: "",
    ...moon_event[0]
  };
}
