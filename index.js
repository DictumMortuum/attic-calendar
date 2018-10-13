'use strict';

const path = "./resources/www.numachi.com/~ccount/hmepa/calendars";
const glob = require('glob-promise');
const month = require('./src/parser/month');
const ical = require('./src/ical');
const months = require('./src/months.json');
const names = require('./src/names');

const extramonth = () => glob("[0-9]*-*", {cwd: path});

const year = async (o, y) => {
  let extra = await extramonth();
  let fn = names.month(o)(y);
  let res = extra.filter(d => fn('Poseideon-2') === d);
  return res.length === 1 ? months.extra : months.normal;
}

const main = async (o, y) => {
  let fn = names.month(o)(y);
  let tmp = await year(o, y);
  let res = tmp.map(m => month(path, m, fn));
  ical(res);
}

main(699, 2);
