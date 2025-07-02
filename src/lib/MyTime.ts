import {
  formatDate,
  addToDate,
  subtractFromDate,
  diffDates,
  relativeTime,
  calendarView,
  startOfUnit,
  endOfUnit
} from '../core';
import { getLocale, Locale, defaultLocale } from '../locales';
import type { Unit } from '../types/units';

type MyTimeInput = string | number | Date;

export class MyTime {
  private readonly date: Date;
  private readonly offset: number;
  private readonly locale: Locale;

  constructor(input?: MyTimeInput, localeCode: string = 'en', offset: number = 0) {
    this.date = new Date(input ?? Date.now());
    this.offset = offset;
    this.locale = getLocale(localeCode);
  }

  static extend(plugin: (proto: typeof MyTime) => void) {
    plugin(MyTime);
  }

  clone(): MyTime {
    return new MyTime(this.date.toISOString(), this.locale.code, this.offset);
  }

  add(amount: number, unit: Unit): MyTime {
    const newDate = addToDate(this.date, amount, unit);
    return new MyTime(newDate, this.locale.code, this.offset);
  }

  subtract(amount: number, unit: Unit): MyTime {
    const newDate = subtractFromDate(this.date, amount, unit);
    return new MyTime(newDate, this.locale.code, this.offset);
  }

  format(pattern = 'YYYY-MM-DD HH:mm:ss'): string {
    return formatDate(this.date, pattern, this.locale, this.offset);
  }

  diff(other: MyTimeInput, unit: Unit = 'milliseconds'): number {
    return diffDates(this.date, new Date(other), unit);
  }

  fromNow(): string {
    return relativeTime(this.date, new Date(), this.locale);
  }

  toNow(): string {
    return relativeTime(new Date(), this.date, this.locale);
  }

  startOf(unit: Unit): MyTime {
    return new MyTime(startOfUnit(this.date, unit), this.locale.code, this.offset);
  }

  endOf(unit: Unit): MyTime {
    return new MyTime(endOfUnit(this.date, unit), this.locale.code, this.offset);
  }

  calendar(ref?: MyTimeInput): string {
    const reference = new Date(ref ?? Date.now());
    return calendarView(this.date, reference, this.locale);
  }

  utcOffset(minutes: number): MyTime {
    return new MyTime(this.date, this.locale.code, minutes);
  }

  get raw(): Date {
    return new Date(this.date.getTime() + this.offset * 60000);
  }

  get iso(): string {
    return this.raw.toISOString();
  }

  localeCode(): string {
    return this.locale.code;
  }
}