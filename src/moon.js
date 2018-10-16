'use strict';

const lune = require('lune');
const moon_re = /(\d+:\d+) \d+\/\d+/;

const translate = phase => {
  switch(phase) {
    case 'new moon':
      return lune.PHASE_NEW;
    case 'last quarter':
      return lune.PHASE_LAST;
    case 'full moon':
      return lune.PHASE_FULL;
    case 'first quarter':
      return lune.PHASE_FIRST;
  }
}

const is_moon = ({alt, text}) => alt !== '' && moon_re.test(text);
const moon = (start, end, phase) => lune.phase_range(start, end, translate(phase));

module.exports = (events, today_sunset, tomorrow_sunset) => {
  const res = events.filter(is_moon);

  if (res.length > 0) {
    const {text, alt} = res[0];
    const [_, hmepa_moon] = moon_re.exec(text);
    const event = moon(today_sunset, tomorrow_sunset, alt);
  
    return {
      hmepa_moon,
      hmepa_moon_phase: alt,
      moon_event: event[0]
    }
  } else {
    return {
      hmepa_moon: "",
      hmepa_moon_phase: "",
      moon_event: ""
    }
  }
};
