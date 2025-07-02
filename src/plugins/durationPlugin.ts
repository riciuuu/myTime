export interface Duration {
  value: number;
  humanize: () => string;
}

export function durationPlugin(MyTime: typeof import('../lib/MyTime').MyTime) {
  MyTime.duration = function ({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  }: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }): Duration {
    const total =
      days * 86400000 +
      hours * 3600000 +
      minutes * 60000 +
      seconds * 1000;

    return {
      value: total,
      humanize() {
        const d = Math.floor(total / 86400000);
        const h = Math.floor((total % 86400000) / 3600000);
        const m = Math.floor((total % 3600000) / 60000);
        const s = Math.floor((total % 60000) / 1000);

        return [d && `${d}d`, h && `${h}h`, m && `${m}m`, s && `${s}s`]
          .filter(Boolean)
          .join(' ');
      }
    };
  };
}