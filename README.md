# attic-calendar

This is a calendar that I compiled using the resources from http://www.numachi.com/~ccount/hmepa .

The code tries to transform the details from the .html files contained in the hmepa calendar to an .ics format, so that it is usable in contemporary calendar programs.

The days in ancient Athens started on sundown and ended on the sundown the next day. For this reason, I chose to mark the attic days on the calendar as instant events (not with a range), because it hoged my calendar and it looked ugly. I calculate the sundown using the latitude and longitude of Athens, Greece, but the times of the calendar are all expressed in UST; thus, you can import the whole .ics file in a calendar with your own timezone.

Also marked are the phases of the moon, which I calculate independently from the data of the hmepa calendar. I did this to be aware of any date calculation errors, since the calendar marks these events, as they were important for the calendar: the first day of each month is always Noumenia or Noumenia kata Selene, the day of the new moon.

There are certain events that I skipped on purpose (equinoxes, solstices, cross quarters, etc), as I don't think that they were observed in the Attic calendar. You can read more about them in this [wikipedia](https://en.wikipedia.org/wiki/Wheel_of_the_Year) article.

Additionally, there are multiple sacrifices from the deme of Erchia that I will skip from the calendar, as each deme was supposed to have a sacrifice calendar of each own. According to [this](https://en.wikipedia.org/wiki/Erchia) wikipedia article:

> Much of what is known about Erchia comes from a lex sacra (sacred law) of the deme.[6] In it are listed 59 annual sacrifices to 46 divinities (gods, nymphs and heroes), for a total cost of 547 drachmae; 21 of these sacrifices were made in the deme itself, the other 38 in the neighboring demoi or in Athens.

## Improvements

- Translate all names in both greek and english.
- Provide descriptions of the events.
- Separate event descriptions. As I get all the descriptions from the hmepa calendar, sometimes events on the same day are combined in a single description, e.g. "Lesser_Mysteries_Diasia", when it should've been two separate events - "lesser (Eleusinian) mysteries" and "Diasia".

## Usage

- Untar the `.tar.gz` file under `./assets`.
- `node index.js <<olympiad number>>`

I've already generated the file for the 699th Olympiad and the 700th Olympiad under `target`.

## Useful links

- [hmepa](http://www.numachi.com/~ccount/hmepa/).
- http://www.angelfire.com/moon2/thiasos_hades/Hellenic_Calendar.htm
