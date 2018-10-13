'use strict';

const tagname = $ => el => $(el).parent().get(0).tagName;

const parent = $ => el => level => {
  let tmp = $(el);

  for (let i = 0; i < level; i++) {
    tmp = tmp.parent();
  }

  return tmp;
}

module.exports = {
  tagname,
  parent
}