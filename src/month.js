'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const day = require('./day');

const extract = ($, {olympiad, year, month}) => {
  let days = [];

  $('td > table').each((i, el) => {
    let attr = $(el).attr();
    let events = [];

    $('img', el).each((_, img) => {
      events.push($(img).attr());
    });

    $('font > img', el).each((_, img) => {
      events.push({
        ...$(img).attr(),
        text: $(img).parent().text().trim(),
        type: 'lunar'
      });
    });

    days.push({
      olympiad,
      year,
      month,
      attr,
      events,
    });
  });

  return days.map(day);
}

module.exports = (path, data, fn) => {
  let f = fs.readFileSync(path + '/' + fn(data.month));
  let $ = cheerio.load(f);
  return extract($, data);
}
