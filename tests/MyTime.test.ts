import { describe, it, expect, beforeAll } from 'vitest';
import MyTime from '../src';
import { isBetweenPlugin } from '../src/plugins/isBetween';
import { durationPlugin } from '../src/plugins/durationPlugin';

beforeAll(() => {
  MyTime.extend(isBetweenPlugin);
  MyTime.extend(durationPlugin);
});

describe('MyTime Core Features', () => {
  it('should format date correctly', () => {
    const date = new MyTime('2025-12-25T12:00:00Z', 'en');
    const formatted = date.format('YYYY-MM-DD HH:mm');
    expect(formatted).toBe('2025-12-25 12:00');
  });

  it('should add days correctly', () => {
    const base = new MyTime('2025-01-01T00:00:00Z');
    const added = base.add(7, 'days');
    expect(added.format('YYYY-MM-DD')).toBe('2025-01-08');
  });

  it('should show relative time', () => {
    const past = new MyTime(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    const result = past.fromNow();
    expect(result).toMatch(/hour/);
  });

  it('should support isBetween()', () => {
    const now = new MyTime();
    const before = now.subtract(1, 'hour');
    const after = now.add(1, 'hour');
    expect(now.isBetween(before, after)).toBe(true);
  });

  it('should humanize duration', () => {
    const dur = MyTime.duration({ hours: 2, minutes: 15 });
    expect(dur.humanize()).toBe('2h 15m');
  });
});