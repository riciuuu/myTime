import type { MyTime } from '../lib/MyTime';

const DEFAULT_WEEKEND = [0, 6]; // duminică & sâmbătă

export function businessDaysPlugin(MyTimeClass: typeof MyTime) {
  MyTimeClass.prototype.addBusinessDays = function (
    this: MyTime,
    numDays: number,
    holidays: string[] = [],
    weekendDays = DEFAULT_WEEKEND
  ): MyTime {
    let count = 0;
    let date = this.clone();

    while (count < Math.abs(numDays)) {
      date = date.add(numDays > 0 ? 1 : -1, 'day');

      const day = date.raw.getDay();
      const isWeekend = weekendDays.includes(day);
      const isHoliday = holidays.includes(date.format('YYYY-MM-DD'));

      if (!isWeekend && !isHoliday) {
        count++;
      }
    }

    return date;
  };

  MyTimeClass.prototype.isBusinessDay = function (
    this: MyTime,
    holidays: string[] = [],
    weekendDays = DEFAULT_WEEKEND
  ): boolean {
    const day = this.raw.getDay();
    const isWeekend = weekendDays.includes(day);
    const isHoliday = holidays.includes(this.format('YYYY-MM-DD'));

    return !isWeekend && !isHoliday;
  };
}