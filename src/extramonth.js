'use strict';

const glob = require('glob-promise');

/*
 * Goes through the hmera files and retrieves the extra months.
 */

module.exports = path => () => glob("[0-9]*-*", {cwd: path});
