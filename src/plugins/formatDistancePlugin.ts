import type { MyTime } from '../lib/MyTime';

export function formatDistancePlugin(MyTimeClass: typeof MyTime) {
  MyTimeClass.prototype.formatDistance = function (
    this: MyTime,
    to: Date | MyTime,
    opts: { addSuffix?: boolean } = {}
  ): string {
    const fromTime = this.raw.getTime();
    const toTime = to instanceof MyTime ? to.raw.getTime() : new Date(to).getTime();
    const diffMs = Math.abs(fromTime - toTime);

    const MINUTE = 60_000;
    const HOUR = 3_600_000;
    const DAY = 86_400_000;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;

    let value: number;
    let unit: string;

    if (diffMs < MINUTE) {
      return opts.addSuffix ? 'less than a minute ago' : 'less than a minute';
    } else if (diffMs < HOUR) {
      value = Math.round(diffMs / MINUTE);
      unit = 'minute';
    } else if (diffMs < DAY) {
      value = Math.round(diffMs / HOUR);
      unit = 'hour';
    } else if (diffMs < MONTH) {
      value = Math.round(diffMs / DAY);
      unit = 'day';
    } else if (diffMs < YEAR) {
      value = Math.round(diffMs / MONTH);
      unit = 'month';
    } else {
      value = Math.round(diffMs / YEAR);
      unit = 'year';
    }

    const plural = value > 1 ? `${unit}s` : unit;
    const base = `${value} ${plural}`;

    if (!opts.addSuffix) return base;

    return fromTime < toTime ? `in ${base}` : `${base} ago`;
  };
}