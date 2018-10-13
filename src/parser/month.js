'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const day = require('./day');
const util = require('./util');
const moon = require('./moon');
const festival_re = /Images\/(.*).gif.html/;
const moon_re = /(\d+:\d+) \d+\/\d+/;

const extra_parent = $ => el => {
  let tag = util.tagname($)(el);

  if (tag === 'b' || tag === 'i') {
    return 1;
  } else {
    return 0;
  }
}

const get_date = $ => el => level => {
  let table = util.parent($)(el)(level).attr();
  let {attic_day} = day(table);
  return attic_day;
}

const extract = ($, month) => {
  let days = [];

  $('td > table').each((i, el) => {
    days[i] = day($(el).attr());
    days[i].attic_month = month;
  });

  $('img').each((_, el) => {
    let {alt, src} = $(el).attr();
    let text = $(el).parent().text().trim();

    // Festivals
    if (alt === '') {
      let i = get_date($)(el)(4 + extra_parent($)(el));
      days[i-1].hmepa_festival.push(festival_re.exec(src)[1]);
    }

    // Moon phases
    if (moon_re.test(text)) {
      let i = get_date($)(el)(6);
      days[i-1].hmepa_moon = moon_re.exec(text)[1];
      days[i-1].hmepa_moon_phase = alt;
      days[i-1].moon_event = moon(days[i-1], alt);
    }
  });

  return days;
}

module.exports = (path, month, fn) => {
  let f = fs.readFileSync(path + '/' + fn(month));
  let $ = cheerio.load(f);
  return extract($, month);
}
