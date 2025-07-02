import { en } from './en';
import { ro } from './ro';

export interface Locale {
  code: string;
  months: string[];
  weekdays: string[];
  relative: {
    justNow: string;
    future: string;
    past: string;
    minute: string;
    minutes: string;
    hour: string;
    hours: string;
    day: string;
    days: string;
  };
  calendar: {
    yesterday: string;
    today: string;
    tomorrow: string;
  };
}

const locales: Record<string, Locale> = {
  en,
  ro
};

export function getLocale(code: string): Locale {
  return locales[code] || en;
}

export const defaultLocale = en;