'use strict';

const transforms = require('./festivals.json').transforms;
const flatten = require('./util').flatten;
const festival_re = /Images\/(.*).gif.html/;
const is_festival = ({alt}) => alt === '';

module.exports = events => {
  let types = {};

  let f = events.filter(is_festival).map(({src, type}) => {
    let [_, name] = festival_re.exec(src);
    let transform = transforms[name];

    if (transform) {
      transform.map(t => {
        types[t] = type;
      })
      return transform;
    } else {
      types[name] = type;
      return name;
    }
  });

  return {
    hmepa_festival_types: types,
    hmepa_festival: flatten(f)
  }
}
