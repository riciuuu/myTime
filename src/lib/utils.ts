/**
 * Complete helper utilities for internal MyTime usage
 */

export function pad(value: number, digits = 2): string {
  return value.toString().padStart(digits, '0');
}

export function cloneDate(date: Date): Date {
  return new Date(date.getTime());
}

export function isValidDate(input: unknown): input is Date {
  return input instanceof Date && !isNaN(input.getTime());
}

export function normalizeUnit(unit: string): string {
  const map: Record<string, string> = {
    y: 'years',
    M: 'months',
    d: 'days',
    h: 'hours',
    m: 'minutes',
    s: 'seconds',
    ms: 'milliseconds'
  };
  return map[unit] || unit;
}