'use strict';

const suncalc = require('suncalc');

module.exports = d => suncalc.getTimes(new Date(d), 37.9838, 23.7275);
