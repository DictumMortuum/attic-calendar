'use strict';

const sunset = require('./sunset');
const moon = require('./moon');
const festival = require('./festival');
const re = /(\d+) (\d+)-<br>(\d+)-(\d+)\/(\d+)-?(\d+)?/;
const {translations} = require('../data/months.json');

const date = ([attic_day, year, month, day, day_end, month_end]) => ({
  attic_day,
  gregorian_year: year,
  gregorian_month: month,
  gregorian_day: day,
  gregorian_month_end: month_end || month,
  gregorian_day_end: day_end,
});

module.exports = ({
  olympiad: attic_olympiad,
  year: attic_year,
  month: attic_month,
  attr: {summary},
  events
}) => {
  const info = re.exec(summary).slice(1,7);
  const {today_sunset, tomorrow_sunset} = sunset(info);

  return {
    ...date(info),
    attic_day_start: today_sunset,
    attic_day_end: tomorrow_sunset,
    attic_month,
    attic_month_translated: translations[attic_month],
    attic_year,
    attic_olympiad,
    ...festival(events),
    ...moon(events, today_sunset, tomorrow_sunset)
  };
}
