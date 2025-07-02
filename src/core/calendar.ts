import type { Locale } from '../locales';

export function calendarView(target: Date, reference: Date, locale: Locale): string {
  const oneDay = 24 * 60 * 60 * 1000;
  const diff = Math.floor((startOfDay(target).getTime() - startOfDay(reference).getTime()) / oneDay);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const time = target.toLocaleTimeString(locale.code, timeOptions);

  if (diff === -1) return `${locale.calendar.yesterday} ${time}`;
  if (diff === 0) return `${locale.calendar.today} ${time}`;
  if (diff === 1) return `${locale.calendar.tomorrow} ${time}`;

  return target.toLocaleString(locale.code, {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}