import type { Locale } from './types';

export const ro: Locale = {
  code: 'ro-RO',
  months: [
    'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
    'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'
  ],
  weekdays: [
    'duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'
  ],
  relative: {
    justNow: 'acum',
    future: 'în',
    past: 'în urmă',
    minute: 'minut',
    minutes: 'minute',
    hour: 'oră',
    hours: 'ore',
    day: 'zi',
    days: 'zile'
  },
  calendar: {
    yesterday: 'Ieri la',
    today: 'Azi la',
    tomorrow: 'Mâine la'
  }
};