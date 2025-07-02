import { cloneDate } from '../lib/utils';
import type { Unit } from '../types/units';

/**
 * Returnează începutul unității specificate (zi, lună, an)
 */
export function startOfUnit(date: Date, unit: Unit): Date {
  const d = cloneDate(date);

  switch (unit) {
    case 'day':
      d.setHours(0, 0, 0, 0);
      break;
    case 'month':
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      break;
    case 'year':
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      break;
    default:
      throw new Error(`Unsupported unit for startOf(): ${unit}`);
  }

  return d;
}

/**
 * Returnează finalul unității specificate (zi, lună, an)
 */
export function endOfUnit(date: Date, unit: Unit): Date {
  const d = cloneDate(date);

  switch (unit) {
    case 'day':
      d.setHours(23, 59, 59, 999);
      break;
    case 'month':
      d.setMonth(d.getMonth() + 1, 0); // ultima zi a lunii curente
      d.setHours(23, 59, 59, 999);
      break;
    case 'year':
      d.setMonth(11, 31); // 31 decembrie
      d.setHours(23, 59, 59, 999);
      break;
    default:
      throw new Error(`Unsupported unit for endOf(): ${unit}`);
  }

  return d;
}