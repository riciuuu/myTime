import type { MyTime } from '../lib/MyTime';

export function isBetweenPlugin(MyTimeClass: typeof MyTime) {
  MyTimeClass.prototype.isBetween = function (
    this: MyTime,
    start: Date | MyTime,
    end: Date | MyTime,
    inclusive: boolean = false
  ): boolean {
    const value = this.raw.getTime();
    const startTime = start instanceof MyTime ? start.raw.getTime() : new Date(start).getTime();
    const endTime = end instanceof MyTime ? end.raw.getTime() : new Date(end).getTime();

    if (inclusive) {
      return value >= Math.min(startTime, endTime) && value <= Math.max(startTime, endTime);
    }

    return value > Math.min(startTime, endTime) && value < Math.max(startTime, endTime);
  };
}