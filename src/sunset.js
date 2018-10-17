'use strict';

const suncalc = require('suncalc');

const sunset = d => suncalc.getTimes(new Date(d), 37.9838, 23.7275);

module.exports = ([_, year, month, day]) => {
  let today = new Date(year + '-' + month + '-' + day);
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  return {
    today_sunset: sunset(today).sunset,
    tomorrow_sunset: sunset(tomorrow).sunset
  }
}
