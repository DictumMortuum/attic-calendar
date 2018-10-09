'use strict';

const months = require('./months.json');
const names = require('./names');

module.exports = extramonth => o => y => {
  let fn = names.month(o)(y);
  let res = extramonth.filter(d => fn('Poseideon-2') === d);
  let tmp = res.length === 1 ? months.extra : months.normal;
  return tmp.map(fn);
}
