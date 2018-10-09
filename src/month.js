'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const re = /(\d+) (\d+)-<br>(\d+)-(\d+)\/(\d+)-?(\d+)?/;

const parse = $ => (_, el) => $(el).attr()

const parse_date = (_, {summary}) => {
  let tmp = re.exec(summary);

  console.log({
    attic_day: tmp[1],
    attic_year: tmp[2],
    gregorian_month: tmp[3],
    gregorian_day: tmp[4],
    gregorian_month_end: tmp[6] || tmp[3],
    gregorian_day_end: tmp[5]
  });
}

module.exports = path => {
  let html = fs.readFileSync(path);
  let $ = cheerio.load(html);
  let fn = parse($);
  $('td > table').map(fn).map(parse_date);
}
