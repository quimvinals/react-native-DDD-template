import { Moment } from 'moment';
import moment from 'moment-timezone';
import sinon from 'sinon';

/**
 * Passes if date has the values defined in the parameters
 * @param date Date to check
 * @param year Expected year
 * @param month Expected month
 * @param day Expected day
 * @param hour Expected hour
 * @param minutes Expected minutes
 * @param seconds Expected seconds
 * @param keepLocalTime Optional, if true, hours value will not change after date UTC offset
 */
function dateEquals(
  date: Moment,
  year: number,
  month: number,
  day: number,
  hour = 0,
  minutes = 0,
  seconds = 0,
  keepLocalTime = false,
) {
  date.utcOffset(0, keepLocalTime);
  const expectedDate = moment([year, month - 1, day, hour, minutes, seconds]).utcOffset(0, true);

  !date.isSame(expectedDate) &&
    fail(`Received '${date.toString()}' but '${expectedDate.toString()}' was expected`);
}

export default {
  ...sinon.assert,
  dateEquals,
};
