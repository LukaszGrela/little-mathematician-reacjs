import { describe, expect, test } from "vitest";
import { randomOption, randomRange, shuffle } from "./math";

describe("randomRange", () => {
  test("returns an integer inside the inclusive range", () => {
    for (let i = 0; i < 500; i++) {
      const value = randomRange(2, 7);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThanOrEqual(7);
    }
  });

  test("single-value range returns that value (regression: used to return 0..max)", () => {
    for (let i = 0; i < 50; i++) {
      expect(randomRange(5, 5)).toBe(5);
      expect(randomRange(0, 0)).toBe(0);
    }
  });

  test("zero-only range with includeZero=false does not overflow the stack", () => {
    expect(() => randomRange(0, 0, false)).not.toThrow();
    expect(randomRange(0, 0, false)).toBe(1);
  });

  test("never returns 0 when zero is excluded", () => {
    for (let i = 0; i < 2000; i++) {
      const value = randomRange(0, 3, false);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(3);
    }
  });

  test("still returns negative values when zero is excluded", () => {
    const values = new Set<number>();
    for (let i = 0; i < 500; i++) values.add(randomRange(-3, -1, false));
    expect([...values].sort((a, b) => a - b)).toEqual([-3, -2, -1]);
  });

  test("excludes only zero from a range crossing zero", () => {
    const values = new Set<number>();
    for (let i = 0; i < 3000; i++) values.add(randomRange(-2, 2, false));
    expect(values.has(0)).toBe(false);
    expect([...values].sort((a, b) => a - b)).toEqual([-2, -1, 1, 2]);
  });

  test("accepts reversed bounds", () => {
    for (let i = 0; i < 200; i++) {
      const value = randomRange(7, 2);
      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThanOrEqual(7);
    }
  });
});

describe("randomOption", () => {
  test("returns an element of the list", () => {
    const list = ["result", "a", "b"] as const;
    for (let i = 0; i < 100; i++) {
      expect(list).toContain(randomOption(list));
    }
  });

  test("throws a clear error for an empty list", () => {
    expect(() => randomOption([])).toThrow(/empty list/);
  });
});

describe("shuffle", () => {
  test("returns a permutation and does not mutate the input", () => {
    const input = [1, 2, 3, 4, 5];
    const snapshot = [...input];
    const result = shuffle(input);

    expect(input).toEqual(snapshot);
    expect(result).not.toBe(input);
    expect([...result].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
  });

  test("keeps duplicate values and their count", () => {
    const result = shuffle([0, 0, 1, 1, 2, 2]);
    expect(result).toHaveLength(6);
    expect(result.filter((value) => value === 0)).toHaveLength(2);
    expect(result.filter((value) => value === 1)).toHaveLength(2);
    expect(result.filter((value) => value === 2)).toHaveLength(2);
  });

  test("handles empty and single element lists", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle([42])).toEqual([42]);
  });
});
