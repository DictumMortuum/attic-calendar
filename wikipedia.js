const request = require('request-promise');
const festivals = require('./src/festivals.json').festivals;
const festivals_new = {...festivals};

const args = '?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
const url = locale => 'https://' + locale + '.wikipedia.org/w/api.php';

const search = async term => {
  let {query: {pages}} = await request({
    uri: url('en') + args + term,
    json: true
  });

  Object.keys(pages).map(o => {
    let {extract} = pages[o];
    festivals_new[term].desc = extract;
    console.log("===============");
    console.log(festivals_new);
  });
}

Object.keys(festivals).map(f => {
  search(f);
}).then(d => {
  console.log(d);
})
