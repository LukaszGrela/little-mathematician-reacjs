import { expect, test } from "vitest";

import { formatTimestamp, getAnsweredCount } from "./history";
import type { TGameObject } from "../types";

const buildGame = (overrides: Partial<TGameObject> = {}): TGameObject => ({
  id: "game-1",
  status: "finished",
  finishedAt: 1_700_000_000_000,
  score: 3,
  type: "addition",
  history: [],
  hudQuestionCurrent: 11,
  hudCorrectAnswers: 3,
  questions: [],
  operation: "+",
  questionCount: 10,
  from: 0,
  to: 10,
  ...overrides,
});

test("counts answered questions from the 1-based cursor", () => {
  expect(getAnsweredCount(buildGame())).toBe(10);
  expect(getAnsweredCount(buildGame({ hudQuestionCurrent: 2 }))).toBe(1);
  expect(getAnsweredCount(buildGame({ hudQuestionCurrent: 1 }))).toBe(0);
});

test("never reports more answers than questions", () => {
  expect(
    getAnsweredCount(buildGame({ hudQuestionCurrent: 99, questionCount: 10 })),
  ).toBe(10);
});

test("clamps a malformed cursor to a sane range", () => {
  expect(getAnsweredCount(buildGame({ hudQuestionCurrent: 0 }))).toBe(0);
  expect(getAnsweredCount(buildGame({ hudQuestionCurrent: -5 }))).toBe(0);
  expect(getAnsweredCount(buildGame({ hudQuestionCurrent: NaN }))).toBe(0);
  expect(getAnsweredCount(buildGame({ questionCount: 0 }))).toBe(0);
  expect(getAnsweredCount(buildGame({ questionCount: NaN }))).toBe(0);
});

test("formats a timestamp in local time", () => {
  const value = new Date(2024, 0, 2, 3, 4, 5).getTime();
  expect(formatTimestamp(value)).toBe("2024-01-02 03:04");
});

test("renders a dash for a missing timestamp", () => {
  expect(formatTimestamp(null)).toBe("—");
  expect(formatTimestamp(NaN)).toBe("—");
  expect(formatTimestamp(Infinity)).toBe("—");
});