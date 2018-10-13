const ical = require('ical-generator');
const http = require('http');
const cal = ical({
  domain: 'github.com',
  prodId: {company: 'https://github.com/DictumMortuum/attic-calendar', product: 'attic-calendar'},
  name: 'attic-calendar'
});

module.exports = year => {
  let month = year[0];

  month.map(({
    attic_day,
    attic_day_start: start,
    attic_day_end: end,
    attic_month,
    hmepa_festival,
    moon_event
  }) => {
    console.log(start.toString());
    cal.createEvent({
      start,
      end,
      summary: attic_day + " " + attic_month,
      organizer: 'Δημήτρης Ραβιόλος <dimitris.raviolos@gmail.com>',
      description: hmepa_festival.join(',') + moon_event
    });
  });

  cal.save('bla.ics', e => {console.log(e)})

  /*
  http.createServer(function(req, res) {
    cal.serve(res);
  }).listen(3000, '0.0.0.0', function() {
      console.log('Server running at http://127.0.0.1:3000/');
  });
  */
}
