import { cloneDate } from '../lib/utils';
import type { Unit } from '../types/units';

const unitToMs: Record<Unit, number> = {
  milliseconds: 1,
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
  months: 30 * 24 * 60 * 60 * 1000, // aproximativ
  years: 365 * 24 * 60 * 60 * 1000  // aproximativ
};

export function diffDates(dateA: Date, dateB: Date, unit: Unit = 'milliseconds'): number {
  const a = cloneDate(dateA).getTime();
  const b = cloneDate(dateB).getTime();
  const diff = a - b;

  const divisor = unitToMs[unit];
  if (!divisor) throw new Error(`Unsupported unit for diff: ${unit}`);

  return Math.floor(diff / divisor);
}