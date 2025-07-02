import { pad, cloneDate } from '../lib/utils';
import type { Locale } from '../locales';

export function formatDate(
  date: Date,
  pattern: string,
  locale: Locale,
  offset: number = 0
): string {
  const d = new Date(date.getTime() + offset * 60000);

  const map: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
    dddd: locale.weekdays[d.getDay()],
    MMMM: locale.months[d.getMonth()]
  };

  return pattern.replace(
    /YYYY|MM|DD|HH|mm|ss|dddd|MMMM/g,
    (match) => map[match] || match
  );
}