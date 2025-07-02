# 🕰️ mytime

[![npm](https://img.shields.io/npm/v/mytime.svg)](https://www.npmjs.com/package/mytime)
[![build](https://github.com/riciuuu/mytime/actions/workflows/ci.yml/badge.svg)](https://github.com/riciuuu/mytime/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Modular, modern and immutable date/time library written in TypeScript — made with ❤️ in România.

---

## ✨ Why MyTime?

You deserve a date/time library that is:

- 🔁 Immutable — like time itself  
- 📦 Lightweight — no bloat, just plugins  
- 🌍 Localized — because „Ieri la 14:00” matters too  
- 🧱 Modular — pick only what you need  
- ⛓️ Chainable — clean and fluent syntax  
- 🧠 Typed — full TypeScript support  
- 🔌 Extensible — via plugin system  
- 📅 Practical — human-friendly formatting, diffs, calendar view  

---

## 🚀 Quick Start

```bash
npm install mytime
```

```ts
import MyTime from 'mytime';

const now = new MyTime();

console.log(now.format()); // "2025-07-02 14:15:00"
console.log(now.add(3, 'days').fromNow()); // "în 3 zile"
console.log(now.calendar()); // "Azi la 14:15"
```

---

## 🔩 Core Features

| Funcționalitate         | Exemplu                                      |
|--------------------------|-----------------------------------------------|
| `.format()`              | `YYYY-MM-DD HH:mm:ss`, `dddd, D MMMM`        |
| `.add()`, `.subtract()`  | Manipulare cu unități (`days`, `months`)     |
| `.diff()`                | Diferență între 2 date                        |
| `.fromNow()`, `.toNow()` | Timp relativ („acum 3 zile”)                 |
| `.calendar()`            | Expresii naturale („Ieri la 14:00”)          |
| `.startOf()`, `.endOf()` | Limitele unei unități                        |
| `.utcOffset()`           | Offset personalizat (minute)                 |
| `.locale()`              | Suport `ro`, `en`, extensibil                |

---

## 🌍 Locale Support

```ts
const ro = new MyTime('2025-12-25T12:00:00', 'ro');
console.log(ro.format('dddd, D MMMM YYYY')); // "joi, 25 decembrie 2025"
```

✔️ Locale-uri incluse:  
- `en-US` (implicit)  
- `ro-RO` (română)

Poți adăuga ușor locale în `src/locales/{lang}.ts`.

---

## 🔌 Plugin System

Extinde funcționalitatea folosind `.extend()`:

```ts
import {
  durationPlugin,
  isBetweenPlugin,
  timezonePlugin,
  businessDaysPlugin,
  rangePlugin,
  formatDistancePlugin,
  calendarifyPlugin,
  parseCustomPlugin
} from 'mytime/plugins';

MyTime.extend(durationPlugin);
MyTime.extend(isBetweenPlugin);
MyTime.extend(timezonePlugin);
MyTime.extend(businessDaysPlugin);
MyTime.extend(rangePlugin);
MyTime.extend(formatDistancePlugin);
MyTime.extend(calendarifyPlugin);
MyTime.extend(parseCustomPlugin);
```

---

## 🧩 Pluginuri Detaliate

### 🔹 `durationPlugin`

```ts
MyTime.extend(durationPlugin);

const d = MyTime.duration({ hours: 2, minutes: 15 });
console.log(d.humanize()); // 👉 "2h 15m"
```

---

### 🔹 `isBetweenPlugin`

```ts
MyTime.extend(isBetweenPlugin);

const now = new MyTime();
const start = now.subtract(1, 'day');
const end = now.add(1, 'day');

console.log(now.isBetween(start, end)); // 👉 true
```

---

### 🔹 `timezonePlugin`

```ts
MyTime.extend(timezonePlugin);

const now = new MyTime();
console.log(now.format('HH:mm', { timeZone: 'Europe/Bucharest' }));
console.log(now.tz('Asia/Tokyo').format());
```

---

### 🔹 `businessDaysPlugin`

```ts
MyTime.extend(businessDaysPlugin);

const holidays = ['2025-12-25'];
const d = new MyTime('2025-12-24');

console.log(d.addBusinessDays(3, holidays).format()); // 👉 sare peste weekend & sărbători
```

---

### 🔹 `rangePlugin`

```ts
MyTime.extend(rangePlugin);

const r = MyTime.range(new Date('2025-07-01'), new Date('2025-07-05'));
console.log(r.includes(new Date('2025-07-03'))); // 👉 true
console.log(r.split('day').map(d => d.format())); // 👉 ["2025-07-01", ...]
```

---

### 🔹 `formatDistancePlugin`

```ts
MyTime.extend(formatDistancePlugin);

const a = new MyTime('2025-01-01');
const b = new MyTime('2025-03-01');

console.log(a.formatDistance(b)); // 👉 "2 months"
console.log(b.formatDistance(a, { addSuffix: true })); // 👉 "2 months ago"
```

---

### 🔹 `calendarifyPlugin`

```ts
MyTime.extend(calendarifyPlugin);

const grid = MyTime.calendarGrid({ year: 2025, month: 7 });
grid.forEach(cell => {
  console.log(`${cell.day} | weekend: ${cell.isWeekend}`);
});
```

---

### 🔹 `parseCustomPlugin`

```ts
MyTime.extend(parseCustomPlugin);

const d = MyTime.parse('25/12/2025', 'DD/MM/YYYY');
console.log(d.format()); // 👉 "2025-12-25 00:00:00"
```

---

## 🧪 Testing

```bash
npm run test
```

✔️ Testat cu [Vitest](https://vitest.dev), full TypeScript support.

---

## 🛠 Build

```bash
npm run build
```

- ESM: `dist/mytime.esm.js`  
- CJS: `dist/mytime.cjs.js`  
- Types: `dist/types/`

---

## 📦 Directory structure

```
mytime/
├─ src/
│  ├─ lib/          # clasa principală
│  ├─ core/         # funcționalități interne
│  ├─ plugins/      # extensii disponibile
│  └─ locales/      # limbaje
├─ tests/           # teste unitare
├─ dist/            # build final
├─ types/           # .d.ts extern
```

---

## 🤝 Contribuie

Te invit să contribui cu:

- ✨ Pluginuri noi (`weekOfYear`, `timezoneAuto`)
- 🌍 Noi localizări
- 📚 Documentație și exemple
- 🧪 Teste pentru edge cases

---

## 📄 Licență

MIT © [riciuuu](https://github.com/riciuuu)

---

> Modern date/time magic, made in Romania 🇷🇴✨
