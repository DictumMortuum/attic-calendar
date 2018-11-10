const ical = require('ical-generator');
const {flatten} = require('./util');
const YAML = require('yaml');
const fs = require('fs');

const cal = ical({
  domain: 'attic-calendar',
  prodId: {company: 'https://github.com/DictumMortuum/attic-calendar', product: 'attic-calendar'},
  name: 'attic-calendar',
});

const template = {
  organizer: 'Δημήτρης Ραβιόλος <dimitris.raviolos@gmail.com>',
  lastModified: new Date()
};

const uid = ({
  attic_olympiad,
  attic_year,
  attic_month,
  attic_day
}, id = "") => attic_olympiad + '_' + attic_year + '_' + attic_month + '_' + attic_day + '_' + id

const month = m => {
  // Registers days
  m.map(d => {
    let {attic_day_start, attic_day, attic_month_translated} = d;

    cal.createEvent({
      ...template,
      uid: uid(d),
      start: attic_day_start,
      end: attic_day_start,
      summary: attic_day + " " + attic_month_translated
    });
  });

  // Registers moon events.
  m.filter(d => d.moon_event !== '').map(d => {
    let {moon_event, hmepa_moon_phase} = d;

    cal.createEvent({
      ...template,
      uid: uid(d, 'moon'),
      start: moon_event,
      end: moon_event,
      summary: hmepa_moon_phase
    });
  });

  // Registers festivals.
  [...new Set(flatten(m.map(d => d.hmepa_festival)))].map(f => {
    let days = m.filter(d => d.hmepa_festival.includes(f));
    let {attic_day_start,hmepa_festival_info} = days[0];
    let {attic_day_end} = days[days.length-1];
    let {type} = hmepa_festival_info[f];

    // Skipping erchian sacrifices
    // Also temporarily skipping monthly recurring observances due to lack of information.
    if (type !== 'sacrifice' && type !== 'recurring monthly') {

      try {
        let file = fs.readFileSync('./locale/el/' + f + '.yaml', 'utf8');
        let {name, description}= YAML.parse(file);

        cal.createEvent({
          ...template,
          uid: uid(days[0], f),
          start: attic_day_start,
          end: attic_day_end,
          summary: name,
          description
        });
      } catch(e) {
        console.log('The description of festival ' + f + ' was not found. It is observed from: ' + attic_day_start + ' to: ' + attic_day_end);
        console.log(e.message);
      }
    }
  });
}

const year = y => y.map(month);

module.exports = olympiad => {
  let o = olympiad[0][0][0].attic_olympiad;
  olympiad.map(year);
  cal.saveSync('./target/' + o + '.ics');
}
