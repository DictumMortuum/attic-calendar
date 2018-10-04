'use strict';

/*
 * Returns an Olympiad
 * Which has 4 years
 * Every year may contain an extra Poseideon month
 * This piece of code determines if a year contains an extra month by
 * checking the hmera calendar files.
 */

const glob = require('glob-promise');
const months = require('./months.json');

const month = o => y => name => o + '.' + y + '.' + name + '.html';

const year = years => o => y => {
  let fn = month(o)(y);
  let res = years.filter(d => fn('Poseideon-2') === d);
  let tmp = res.length === 1 ? months.extra : months.normal;
  return tmp.map(fn);
}

module.exports = path => async o => {
  let extra = await glob("[0-9]*-*", {cwd: path});
  let fn = year(extra)(o);
  
  return {
    olympiad: o + '.html',
    years: [1,2,3,4].map(fn)
  };
}
