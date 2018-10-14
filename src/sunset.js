'use strict';

const suncalc = require('suncalc');

/*
console.log(new Date(light('2018-10-04').sunset).toString())
console.log(light('2018-10-04'));
*/

module.exports = d => suncalc.getTimes(new Date(d), 37.9838, 23.7275);
