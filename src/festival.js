'use strict';

const transforms = require('../data/transforms.json');
const festivals = require('../data/festivals.json');
const flatten = require('./util').flatten;
const festival_re = /Images\/(.*).gif.html/;
const is_festival = ({alt}) => alt === '';

module.exports = events => {
  let info = {};

  let f = events.filter(is_festival).map(({src}) => {
    let [_, name] = festival_re.exec(src);
    let transform = transforms[name];

    if (transform) {
      transform.map(t => {
        info[t] = festivals[t];
      })
      return transform;
    } else {
      info[name] = festivals[name];
      return name;
    }
  });

  return {
    hmepa_festival_info: info,
    hmepa_festival: flatten(f)
  }
}
