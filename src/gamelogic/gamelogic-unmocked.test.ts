import { describe, expect, test } from "vitest";
import {
  buildDistractors,
  generateGameObject,
  prepareQuestions,
} from "./gamelogic";
import {
  GAME_ADDITION,
  GAME_DIVISION,
  GAME_MULTIPLICATION,
  GAME_SUBTRACTION,
  type TGameType,
} from "../gameTypes";
import type { TGameConfig, TGameObject, TQuestion } from "../types";

const configFor = (
  type: TGameType,
  general: Partial<TGameConfig["general"]> = {},
): TGameConfig => ({
  general: { questionCount: 50, from: 0, to: 10, ...general },
  type,
});

const GAMES: Array<{ type: TGameType; operation: string }> = [
  { type: GAME_ADDITION, operation: "+" },
  { type: GAME_SUBTRACTION, operation: "-" },
  { type: GAME_MULTIPLICATION, operation: "x" },
  { type: GAME_DIVISION, operation: "/" },
];

const answerOf = (question: TQuestion) =>
  question.ask === "result"
    ? question.result
    : question.ask === "a"
      ? question.operandA
      : question.operandB;

/**
 * `TGameObject.questions` is `(TQuestion | null)[]`, because the reducer
 * replaces an answered question with `null`. A freshly generated game never
 * has holes, so the tests narrow the type here and fail loudly if that ever
 * changes instead of silently skipping a missing question.
 */
const generatedQuestions = (game: TGameObject): TQuestion[] =>
  game.questions.map((question, index) => {
    if (question === null) {
      throw new Error(`expected question ${index} to be generated, got null`);
    }
    return question;
  });

describe("buildDistractors", () => {
  test("returns four unique options including the correct answer", () => {
    for (let correct = 0; correct <= 20; correct++) {
      const options = buildDistractors(correct);
      expect(options).toHaveLength(4);
      expect(new Set(options).size).toBe(4);
      expect(options).toContain(correct);
    }
  });

  test("never returns a negative option for small correct values", () => {
    for (let correct = 0; correct <= 5; correct++) {
      expect(buildDistractors(correct).every((value) => value >= 0)).toBe(true);
    }
  });

  test("respects the minimum option value", () => {
    for (let correct = 1; correct <= 10; correct++) {
      expect(buildDistractors(correct, 1).every((value) => value >= 1)).toBe(
        true,
      );
    }
  });
});

describe("prepareQuestions", () => {
  test.each(GAMES)("builds $type questions", ({ type, operation }) => {
    const questions = prepareQuestions(0, 10, 25, type);
    expect(questions).toHaveLength(25);
    questions.forEach((question, index) => {
      expect(question.id).toBe(index);
      expect(question.operation).toBe(operation);
    });
  });

  test("returns an empty list for an unknown game type", () => {
    // @ts-expect-error runtime guard for a value coming from the URL
    expect(prepareQuestions(0, 10, 5, "unknown")).toEqual([]);
  });

  test("returns an empty list for a question count of zero", () => {
    expect(prepareQuestions(0, 10, 0, GAME_ADDITION)).toEqual([]);
  });
});

describe("generateGameObject", () => {
  test.each(GAMES)("$type game has valid, unique answers", ({ type, operation }) => {
    const game = generateGameObject(configFor(type));

    expect(game.type).toBe(type);
    expect(game.operation).toBe(operation);
    expect(game.questions).toHaveLength(50);
    expect(game.hudQuestionCurrent).toBe(1);
    expect(game.hudCorrectAnswers).toBe(0);

    generatedQuestions(game).forEach((question) => {
      expect(question.operation).toBe(operation);
      expect(question.correct).toBe(answerOf(question));
      expect(question.distractors).toHaveLength(4);
      expect(new Set(question.distractors).size).toBe(4);
      expect(question.distractors).toContain(question.correct);
      expect(question.distractors.every((value) => value >= 0)).toBe(true);
    });
  });

  test("division questions are solvable and never divide by zero", () => {
    const questions = generatedQuestions(
      generateGameObject(configFor(GAME_DIVISION)),
    );
    questions.forEach((question) => {
      expect(question.operandB).not.toBe(0);
      expect(question.operandA % question.operandB).toBe(0);
      expect(question.operandA / question.operandB).toBe(question.result);
      if (question.ask === "b") {
        expect(question.correct).toBeGreaterThanOrEqual(1);
      }
    });
  });

  test("subtraction never produces negative operands or results", () => {
    const questions = generatedQuestions(
      generateGameObject(configFor(GAME_SUBTRACTION)),
    );
    questions.forEach((question) => {
      expect(question.operandA).toBeGreaterThanOrEqual(question.operandB);
      expect(question.result).toBe(question.operandA - question.operandB);
      expect(question.result).toBeGreaterThanOrEqual(0);
    });
  });

  test("keeps the configured range for both operands", () => {
    const questions = generatedQuestions(
      generateGameObject(configFor(GAME_MULTIPLICATION, { from: 2, to: 6 })),
    );
    questions.forEach((question) => {
      expect(question.operandA).toBeGreaterThanOrEqual(2);
      expect(question.operandA).toBeLessThanOrEqual(6);
      expect(question.operandB).toBeGreaterThanOrEqual(2);
      expect(question.operandB).toBeLessThanOrEqual(6);
    });
  });

  test("normalises a zero question count into a playable game", () => {
    const game = generateGameObject(configFor(GAME_ADDITION, { questionCount: 0 }));
    expect(game.questionCount).toBeGreaterThanOrEqual(1);
    expect(game.questions.length).toBeGreaterThanOrEqual(1);
    expect(game.operation).toBe("+");
  });

  test("uses per-game settings when they are configured", () => {
    const config: TGameConfig = {
      general: { questionCount: 5, from: 0, to: 10 },
      [GAME_DIVISION]: { questionCount: 3, from: 1, to: 4 },
      type: GAME_DIVISION,
    };
    const game = generateGameObject(config);
    expect(game.questions).toHaveLength(3);
    expect(game.from).toBe(1);
    expect(game.to).toBe(4);
  });
});
