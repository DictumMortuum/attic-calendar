'use strict';

const lune = require('lune');

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

module.exports = ({attic_day_start, attic_day_end}, phase) => lune.phase_range(attic_day_start, attic_day_end, translate(phase));
