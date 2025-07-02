# 🕰️ mytime

[![npm](https://img.shields.io/npm/v/mytime.svg)](https://www.npmjs.com/package/mytime)
[![build](https://github.com/riciuuu/mytime/actions/workflows/ci.yml/badge.svg)](https://github.com/riciuuu/mytime/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Modular, modern and immutable date/time library written in TypeScript — made with ❤️ in România.

---

## ✨ Why MyTime?

Because you deserve a date/time library that is:

- 🔁 Immutable — like time itself  
- 📦 Lightweight — no bloat, just plugins  
- 🌍 Localized — because "Ieri la 14:00" matters too  
- 🧱 Modular — pick what you need  
- ⛓️ Chainable — clean syntax, predictable logic  
- 🧠 Typed — full TypeScript support  
- 🔌 Extensible — via plugin system  
- 📅 Practical — human-friendly formatting, diffing, calendar views  

---

## 🚀 Quick Start

```bash
npm install mytime
```

```ts
import MyTime from 'mytime';

const now = new MyTime();

console.log(now.format()); // e.g. "2025-07-02 14:15:00"
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
| `.fromNow()`, `.toNow()` | Timp relativ                                 |
| `.calendar()`            | Text naturalizat („Ieri la 14:00”)           |
| `.startOf()`/`.endOf()`  | Începutul/finalul unei unități               |
| `.utcOffset()`           | Offset personalizat (în minute)              |
| `.locale()`              | Suport multi-limbă (`ro`, `en`)              |

---

## 🔌 Plugin System

`mytime` este extensibil printr-un sistem `extend()`:

```ts
import { isBetweenPlugin } from 'mytime/plugins/isBetween';
import { durationPlugin } from 'mytime/plugins/durationPlugin';

MyTime.extend(isBetweenPlugin);
MyTime.extend(durationPlugin);
```

### ✅ Pluginuri incluse:

| Plugin       | Descriere                                 |
|--------------|--------------------------------------------|
| `isBetween`  | `.isBetween(dateA, dateB)`                 |
| `duration`   | `MyTime.duration(...)`, `.humanize()`      |

---

## ⏱ Duration Example

```ts
const dur = MyTime.duration({ hours: 1, minutes: 30 });
dur.value;       // ms total
dur.humanize();  // "1h 30m"
```

---

## 🌍 Locale Support

```ts
const ro = new MyTime('2025-12-25T12:00:00', 'ro');
console.log(ro.format('dddd, D MMMM YYYY')); // "joi, 25 decembrie 2025"
```

Suportate:
- `en-US` (implicit)
- `ro-RO` (română)

Ușor extensibilă prin fișierele `src/locales/{


    ## 🔌 Pluginuri Detaliate

### 🔹 `durationPlugin`

**Descriere:**  
Permite crearea de durate (intervale de timp) și afișarea lor în format umanizat (`2h 30m`).

```ts
import { durationPlugin } from 'mytime/plugins';
MyTime.extend(durationPlugin);

const d = MyTime.duration({ hours: 2, minutes: 15 });
console.log(d.value);       // 👉 8100000 ms
console.log(d.humanize());  // 👉 "2h 15m"
```

---

### 🔹 `isBetweenPlugin`

**Descriere:**  
Verifică dacă o dată se află între două altele. Suportă și comparații inclusive.

```ts
import { isBetweenPlugin } from 'mytime/plugins';
MyTime.extend(isBetweenPlugin);

const now = new MyTime();
const before = now.subtract(1, 'day');
const after = now.add(1, 'day');

console.log(now.isBetween(before, after));        // 👉 true
console.log(now.isBetween(before, after, true));  // 👉 true (inclusive)
```

---

### 🔹 `timezonePlugin`

**Descriere:**  
Permite conversia și afișarea în timezone-uri specifice (ex: `Asia/Tokyo`, `Europe/Bucharest`).

```ts
import { timezonePlugin } from 'mytime/plugins';
MyTime.extend(timezonePlugin);

const now = new MyTime();
const tokyo = now.tz('Asia/Tokyo');

console.log(tokyo.format('YYYY-MM-DD HH:mm:ss')); // 👉 ora în Tokyo
console.log(now.format('HH:mm', { timeZone: 'Europe/Bucharest' })); // 👉 ora în România
```

---

### 🔹 `businessDaysPlugin`

**Descriere:**  
Adaugă zile lucrătoare excluzând weekendurile și sărbătorile definite.

```ts
import { businessDaysPlugin } from 'mytime/plugins';
MyTime.extend(businessDaysPlugin);

const today = new MyTime('2025-12-24');
const holidays = ['2025-12-25'];

const next = today.addBusinessDays(3, holidays);
console.log(next.format('YYYY-MM-DD')); // 👉 sare peste Crăciun și weekend

console.log(today.isBusinessDay(holidays)); // 👉 false dacă e sărbătoare
```

---

### 🔹 `rangePlugin`

**Descriere:**  
Creează intervale de timp între două date, cu metode utile: `.includes()`, `.duration()`, `.split()`.

```ts
import { rangePlugin } from 'mytime/plugins';
MyTime.extend(rangePlugin);

const start = new MyTime('2025-07-01');
const end = new MyTime('2025-07-05');

const r = MyTime.range(start, end);
console.log(r.includes(new Date('2025-07-03'))); // 👉 true
console.log(r.duration()); // 👉 345600000 ms
console.log(r.split('day').map(d => d.format('YYYY-MM-DD')));
// 👉 ["2025-07-01", ..., "2025-07-05"]
```

---

### 🔹 `formatDistancePlugin`

**Descriere:**  
Exprimă diferența dintre două date într-un mod natural: „acum 5 minute”, „în 2 luni”.

```ts
import { formatDistancePlugin } from 'mytime/plugins';
MyTime.extend(formatDistancePlugin);

const a = new MyTime('2025-01-01');
const b = new MyTime('2025-03-01');

console.log(a.formatDistance(b));                     // 👉 "2 months"
console.log(b.formatDistance(a, { addSuffix: true })); // 👉 "2 months ago"
```

---

### 🔹 `calendarifyPlugin`

**Descriere:**  
Generează o structură cu 42 de zile (6 săptămâni) pentru o lună, ideal pentru calendare UI.

```ts
import { calendarifyPlugin } from 'mytime/plugins';
MyTime.extend(calendarifyPlugin);

const grid = MyTime.calendarGrid({ year: 2025, month: 7 });

grid.forEach(cell => {
  console.log(`${cell.day} | today: ${cell.isToday} | outside: ${cell.isOutsideMonth}`);
});
```

---

### 🔹 `parseCustomPlugin`

**Descriere:**  
Permite parsarea stringurilor de dată în formate customizabile (`"25.12.2025"` etc.)

```ts
import { parseCustomPlugin } from 'mytime/plugins';
MyTime.extend(parseCustomPlugin);

const d = MyTime.parse('25/12/2025', 'DD/MM/YYYY');
console.log(d.format()); // 👉 "2025-12-25 00:00:00"
```

---