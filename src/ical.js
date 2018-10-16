const ical = require('ical-generator');
const flatten = require('./util').flatten;

const cal = ical({
  domain: 'attic-calendar',
  prodId: {company: 'https://github.com/DictumMortuum/attic-calendar', product: 'attic-calendar'},
  name: 'attic-calendar',
});

const template = {
  organizer: 'Δημήτρης Ραβιόλος <dimitris.raviolos@gmail.com>',
  lastModified: new Date()
}

const day = ({
  attic_day,
  attic_month,
  attic_year,
  attic_olympiad,
  attic_day_start,
  hmepa_moon_phase,
  moon_event
}) => {
  let uid = attic_olympiad + '_' + attic_year + '_' + attic_month + '_' + attic_day;

  if (moon_event !== '') {
    cal.createEvent({
      ...template,
      uid: uid + '_moon',
      start: moon_event,
      end: moon_event,
      summary: hmepa_moon_phase
    });
  }

  cal.createEvent({
    ...template,
    uid,
    start: attic_day_start,
    end: attic_day_start,
    summary: attic_day + " " + attic_month
  });
}

const month = m => {
  m.map(day);

  let tmp = m.map(d => d.hmepa_festival);
  let festivals = [...new Set(flatten(tmp))];

  festivals.map(f => {
    let days = m.filter(d => d.hmepa_festival.includes(f));

    let {
      attic_day,
      attic_month,
      attic_year,
      attic_olympiad,
      attic_day_start,
      hmepa_festival_types
    } = days[0];

    let {attic_day_end} = days[days.length-1];
    let type = hmepa_festival_types[f];

    cal.createEvent({
      ...template,
      uid: attic_olympiad + '_' + attic_year + '_' + attic_month + '_' + attic_day + '_' + f,
      start: attic_day_start,
      end: type === 'festival' ? attic_day_end : attic_day_start,
      summary: f,
      description: type
    });
  });
}

const year = y => y.map(month);

module.exports = olympiad => {
  let o = olympiad[0][0][0].attic_olympiad;
  olympiad.map(year);
  cal.saveSync('./target/' + o + '.ics');
}
