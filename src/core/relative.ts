import { diffDates } from './diff';
import type { Locale } from '../locales';

/**
 * Returnează un mesaj naturalizat: „acum X minute”, „în 3 ore”, etc.
 */
export function relativeTime(target: Date, base: Date, locale: Locale): string {
  const secondsDiff = diffDates(target, base, 'seconds');

  const abs = Math.abs(secondsDiff);
  const suffix = secondsDiff > 0 ? locale.relative.future : locale.relative.past;

  if (abs < 45) return locale.relative.justNow;

  if (abs < 90) return `1 ${locale.relative.minute} ${suffix}`;
  if (abs < 3600) return `${Math.round(abs / 60)} ${locale.relative.minutes} ${suffix}`;
  if (abs < 5400) return `1 ${locale.relative.hour} ${suffix}`;
  if (abs < 86400) return `${Math.round(abs / 3600)} ${locale.relative.hours} ${suffix}`;
  if (abs < 129600) return `1 ${locale.relative.day} ${suffix}`;
  return `${Math.round(abs / 86400)} ${locale.relative.days} ${suffix}`;
}