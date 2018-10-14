'use strict';

const path = "./assets/www.numachi.com/~ccount/hmepa/calendars";
const glob = require('glob-promise');
const ical = require('./src/ical');
const months = require('./src/months.json');
const month = require('./src/month');
const args = process.argv.slice(2);

const extramonth = () => glob("[0-9]*-*", {cwd: path});

const file = (o, y) => name => o + '.' + y + '.' + name + '.html'

const year = o => async y => {
  let fn = file(o, y);
  let extra = await extramonth();
  let res = extra.filter(d => fn('Poseideon-2') === d);
  let tmp = res.length === 1 ? months.extra : months.normal;
  return tmp.map(m => month(path, {olympiad: o, year: y, month: m}, fn));
}

const olympiad = o => Promise.all([1, 2, 3, 4].map(year(o)));

olympiad(args[0]).then(ical);
