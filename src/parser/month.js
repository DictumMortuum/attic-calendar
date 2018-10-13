'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const day = require('./day');

const tagname = $ => el => $(el).parent().get(0).tagName;

const parent = $ => el => level => {
  let tmp = $(el);

  for (let i = 0; i < level; i++) {
    tmp = tmp.parent();
  }

  return tmp;
}

const extract = $ => {
  let days = [];
  let moon = [];

  $('td > table').each((i, el) => {
    days[i] = day($(el).attr());
  });

  $('img').each((i, el) => {
    let {alt, src} = $(el).attr();

    if (alt === '') {
      let flag = tagname($)(el) === 'b' ? 1 : 0;
      let table = parent($)(el)(4 + flag).attr();
      let {attic_day} = day(table);
      days[attic_day-1].hmera_festival = src;
    } else {
      //console.log($(el).parent().parent().parent().parent().parent().attr())
      moon.push(src);
    }
  });

  return days;
}

module.exports = path => {
  console.log(path);
  let f = fs.readFileSync(path);
  let $ = cheerio.load(f);
  return extract($);
}
