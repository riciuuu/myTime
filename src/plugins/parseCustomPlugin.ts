import type { MyTime } from '../lib/MyTime';

export function parseCustomPlugin(MyTimeClass: typeof MyTime) {
  MyTimeClass.parse = function (
    input: string,
    format: string,
    locale?: string
  ): MyTime {
    const tokens = format.match(/(YYYY|MM|DD|HH|mm|ss)/g);
    const delimiters = format.split(/(YYYY|MM|DD|HH|mm|ss)/g).filter(part => !tokens?.includes(part));
    const parts = splitByDelimiters(input, delimiters);

    if (!tokens || parts.length !== tokens.length) {
      throw new Error('Invalid format or input for parsing');
    }

    const dateParts: Record<string, number> = {
      year: 1970,
      month: 0,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0
    };

    tokens.forEach((token, i) => {
      const val = parseInt(parts[i], 10);
      switch (token) {
        case 'YYYY': dateParts.year = val; break;
        case 'MM': dateParts.month = val - 1; break;
        case 'DD': dateParts.day = val; break;
        case 'HH': dateParts.hour = val; break;
        case 'mm': dateParts.minute = val; break;
        case 'ss': dateParts.second = val; break;
      }
    });

    return new MyTimeClass(
      new Date(dateParts.year, dateParts.month, dateParts.day, dateParts.hour, dateParts.minute, dateParts.second),
      locale
    );
  };
}

function splitByDelimiters(input: string, delimiters: string[]): string[] {
  let temp = input;
  for (const delim of delimiters) {
    temp = temp.replace(delim, '|');
  }
  return temp.split('|');
}