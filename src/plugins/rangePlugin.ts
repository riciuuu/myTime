import type { MyTime } from '../lib/MyTime';

export interface TimeRange {
  includes: (value: Date | MyTime) => boolean;
  duration: () => number;
  split: (unit: 'day' | 'hour') => MyTime[];
}

export function rangePlugin(MyTimeClass: typeof MyTime) {
  MyTimeClass.range = function (start: Date | MyTime, end: Date | MyTime): TimeRange {
    const startTime = start instanceof MyTime ? start.raw.getTime() : new Date(start).getTime();
    const endTime = end instanceof MyTime ? end.raw.getTime() : new Date(end).getTime();

    return {
      includes(value: Date | MyTime) {
        const val = value instanceof MyTime ? value.raw.getTime() : new Date(value).getTime();
        return val >= Math.min(startTime, endTime) && val <= Math.max(startTime, endTime);
      },
      duration() {
        return Math.abs(endTime - startTime);
      },
      split(unit: 'day' | 'hour') {
        const step = unit === 'day' ? 86_400_000 : 3_600_000;
        const result: MyTime[] = [];
        const forward = startTime <= endTime;
        let cursor = startTime;

        while (forward ? cursor <= endTime : cursor >= endTime) {
          result.push(new MyTimeClass(new Date(cursor)));
          cursor += forward ? step : -step;
        }

        return result;
      }
    };
  };
}