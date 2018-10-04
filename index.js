const path = "./resources/www.numachi.com/~ccount/hmepa/calendars";
const olympiad = require('./src/olympiad')(path);
const suncalc = require('suncalc');

olympiad(700).then(d => console.log(d));

console.log(
  suncalc.getTimes(new Date(), 37.9838, 23.7275)
)