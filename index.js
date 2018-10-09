const path = "./resources/www.numachi.com/~ccount/hmepa/calendars";
const extramonth = require('./src/extramonth')(path);
const olympiad = require('./src/olympiad');
const light = require('./src/light');
const month = require('./src/month');

extramonth().then(d => {
  let fn = olympiad(d)(700)
  let year = fn(3);
  console.log(year);
  let m = month(path + '/' + year[0]);
  console.log(m);
});

console.log(new Date(light('2018-10-04').sunset).toString())
console.log(new Date(light('2018-10-05').sunset).toString())
console.log(new Date(light('2018-10-06').sunset).toString())
console.log(new Date(light('2018-10-07').sunset).toString())
