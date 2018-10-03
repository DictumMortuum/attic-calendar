'use strict';

/*
 * Returns an Olympiad
 * Which has 4 years
 * Every year may contain an extra Poseideon month
 */

const glob = require('glob-promise');
const months = require('./months.json')

const year = years => o => y => {
  let res = years.filter(d => o + '.' + y + '.' + 'Poseideon-2.html' === d);
  return res.length === 1 ? months.extra : months.normal;
}

module.exports = path => async o => {
  let extra = await glob("[0-9]*-*", {cwd: path});
  let f = year(extra)(o);
  return [1,2,3,4].map(f);
}
