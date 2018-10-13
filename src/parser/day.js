'use strict';

const re = /(\d+) (\d+)-<br>(\d+)-(\d+)\/(\d+)-?(\d+)?/;

module.exports = ({summary}) => {
  let tmp = re.exec(summary);
  
  return {
    attic_day: parseInt(tmp[1]),
    attic_year: tmp[2],
    gregorian_month: tmp[3],
    gregorian_day: tmp[4],
    gregorian_month_end: tmp[6] || tmp[3],
    gregorian_day_end: tmp[5],
    hmepa_festival: "",
    hmepa_moon: ""
  };
}
