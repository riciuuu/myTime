import { cloneDate } from '../lib/utils';
import type { Unit } from '../types/units';

export function addToDate(date: Date, amount: number, unit: Unit): Date {
  const d = cloneDate(date);

  switch (unit) {
    case 'years':
      d.setFullYear(d.getFullYear() + amount);
      break;
    case 'months':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'days':
      d.setDate(d.getDate() + amount);
      break;
    case 'hours':
      d.setHours(d.getHours() + amount);
      break;
    case 'minutes':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'seconds':
      d.setSeconds(d.getSeconds() + amount);
      break;
    case 'milliseconds':
      d.setMilliseconds(d.getMilliseconds() + amount);
      break;
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }

  return d;
}

export function subtractFromDate(date: Date, amount: number, unit: Unit): Date {
  return addToDate(date, -amount, unit);
}