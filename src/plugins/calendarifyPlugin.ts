import type { MyTime } from '../lib/MyTime';

type CalendarDay = {
  date: MyTime;
  day: number;
  isToday: boolean;
  isWeekend: boolean;
  isOutsideMonth: boolean;
};

export function calendarifyPlugin(MyTimeClass: typeof MyTime) {
  MyTimeClass.calendarGrid = function ({
    year,
    month,
    startOnMonday = false
  }: {
    year: number;
    month: number; // 1-indexed (1 = January)
    startOnMonday?: boolean;
  }): CalendarDay[] {
    const firstDay = new MyTimeClass(new Date(year, month - 1, 1));
    const lastDay = firstDay.endOf('month');

    const grid: CalendarDay[] = [];

    const weekStartsOn = startOnMonday ? 1 : 0;
    const startOffset = (firstDay.raw.getDay() - weekStartsOn + 7) % 7;

    const start = firstDay.subtract(startOffset, 'day');
    const end = start.add(41, 'day'); // 6 săptămâni × 7 zile = 42 zile

    const today = new MyTimeClass();

    let cursor = start;
    while (cursor.raw <= end.raw) {
      const isOutside = cursor.raw.getMonth() !== firstDay.raw.getMonth();
      const isWeekend = [0, 6].includes(cursor.raw.getDay());
      const isToday = cursor.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');

      grid.push({
        date: cursor,
        day: cursor.raw.getDate(),
        isToday,
        isWeekend,
        isOutsideMonth: isOutside
      });

      cursor = cursor.add(1, 'day');
    }

    return grid;
  };
}