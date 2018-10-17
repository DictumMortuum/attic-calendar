const request = require('request-promise');

const args = '?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
const url = locale => 'https://' + locale + '.wikipedia.org/w/api.php';

request({
  uri: url('en') + args + 'Panathenaia'
}).then(d => console.log(d))
