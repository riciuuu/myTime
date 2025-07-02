import type { MyTime } from '../lib/MyTime';

export function timezonePlugin(MyTimeClass: typeof MyTime) {
  // .tz() → clona data cu un alt timezone
  MyTimeClass.prototype.tz = function (
    this: MyTime,
    timeZone: string
  ): MyTime {
    const iso = this.raw.toISOString();
    const target = new Date(
      new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(new Date(iso))
    );

    return new MyTimeClass(target, this.localeCode(), this.offsetMinutes);
  };

  // format(..., { timeZone })
  const originalFormat = MyTimeClass.prototype.format;
  MyTimeClass.prototype.format = function (
    this: MyTime,
    pattern?: string,
    opts?: { timeZone?: string }
  ): string {
    if (!opts?.timeZone) return originalFormat.call(this, pattern);

    return this.raw.toLocaleString(this.localeCode(), {
      timeZone: opts.timeZone,
      hour12: false,
      ...getFormatPartsFromPattern(pattern || 'YYYY-MM-DD HH:mm:ss')
    });
  };
}

function getFormatPartsFromPattern(pattern: string): Intl.DateTimeFormatOptions {
  // Map simplificat: extinde după nevoie
  return {
    year: pattern.includes('YYYY') ? 'numeric' : undefined,
    month: pattern.includes('MM') ? '2-digit' : undefined,
    day: pattern.includes('DD') ? '2-digit' : undefined,
    hour: pattern.includes('HH') ? '2-digit' : undefined,
    minute: pattern.includes('mm') ? '2-digit' : undefined,
    second: pattern.includes('ss') ? '2-digit' : undefined
  };
}