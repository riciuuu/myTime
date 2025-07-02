import type { Locale } from './types';

export const en: Locale = {
  code: 'en-US',
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  weekdays: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  relative: {
    justNow: 'just now',
    future: 'from now',
    past: 'ago',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days'
  },
  calendar: {
    yesterday: 'Yesterday at',
    today: 'Today at',
    tomorrow: 'Tomorrow at'
  }
};