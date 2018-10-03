const path = "./resources/www.numachi.com/~ccount/hmepa/calendars";
const olympiad = require('./src/olympiad')(path);

olympiad(700).then(d => console.log(d));
