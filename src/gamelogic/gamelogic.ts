/*
Copyright 2018 Łukasz 'Severiaan' Grela GrelaDesign

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_MULTIPLICATION,
  GAME_DIVISION,
  type TGameType,
} from "../gameTypes";
import type {
  TAskOption,
  TGameConfig,
  TGameObject,
  TOperation,
  TQuestion,
} from "../types";
import { randomRange, randomOption, shuffle } from "../utils/math";

const OPERATION_BY_TYPE: Record<TGameType, TOperation> = {
  [GAME_ADDITION]: "+",
  [GAME_SUBTRACTION]: "-",
  [GAME_MULTIPLICATION]: "x",
  [GAME_DIVISION]: "/",
};

/** Number of answer buttons rendered for every question. */
export const DISTRACTOR_COUNT = 4;

/** Offsets tried first, so wrong answers stay close to the correct one. */
const DISTRACTOR_DELTAS = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7];

/**
 * Builds the answer option list: the correct value plus unique, plausible
 * distractors.
 *
 * Guarantees: exactly DISTRACTOR_COUNT values, no duplicates, the correct value
 * is present, and no option is below `min` (0 for most games, 1 for divisors).
 * @param {number} correct correct answer of the question
 * @param {number} min lowest allowed option value (default 0)
 */
export const buildDistractors = (correct: number, min = 0): number[] => {
  // The correct answer is always part of the list, so it also defines the
  // lowest reachable value when a caller passes a minimum above it.
  const floor = Math.min(min, correct);
  const options = new Set<number>([correct]);

  for (const delta of shuffle(DISTRACTOR_DELTAS)) {
    if (options.size >= DISTRACTOR_COUNT) break;
    const candidate = correct + delta;
    if (candidate < floor) continue;
    options.add(candidate);
  }

  // Small correct values (0, 1, 2) cannot reach DISTRACTOR_COUNT with deltas,
  // so widen upwards - always unique and never below `min`.
  for (let offset = 8; options.size < DISTRACTOR_COUNT; offset++) {
    options.add(correct + offset);
  }

  return shuffle([...options]);
};

export const generateGameObject = (config: TGameConfig): TGameObject => {
  //transform config
  const settings = mergeSettings(config, config.type);
  // A game with no questions would be an empty screen, so keep at least one.
  const questionCount = Math.max(1, Math.floor(settings.questionCount) || 1);
  const questions = prepareQuestions(
    settings.from,
    settings.to,
    questionCount,
    config.type,
  );
  return {
    ...settings,
    questionCount,
    type: config.type,
    history: [],
    hudQuestionCurrent: 1,
    hudCorrectAnswers: 0,
    questions,
    // Read the operation from the game type, not from the first question:
    // with an empty question list the old code threw a TypeError.
    operation: OPERATION_BY_TYPE[config.type],
  };
};

/**
 * Merges the general settings with settings specified by the game type (if exists).
 * @param {object} config game settings
 * @param {string} type Game type id
 */
export const mergeSettings = (
  config: Omit<TGameConfig, "type">,
  type?: TGameType,
) => {
  let sectionSettings;
  const { questionCount, from, to } = config.general;
  let settings = {
    questionCount,
    from,
    to,
  };

  switch (type) {
    case GAME_ADDITION:
    case GAME_SUBTRACTION:
    case GAME_MULTIPLICATION:
    case GAME_DIVISION:
      sectionSettings = config[type];
      break;

    default:
      break;
  }

  if (sectionSettings) {
    //combine if section settings exists
    settings = {
      ...settings,
      ...sectionSettings,
    };
  }

  return settings;
};
/**
 * Prepares question list to answer
 * @param {number} from minimum value of equation operand
 * @param {number} to maximum value of equation operand
 * @param {number} count number of questions to generate
 * @param {string} type type of the game
 * @returns {array} List of questions
 */
export const prepareQuestions = (
  from: number,
  to: number,
  count: number,
  type: TGameType,
) => {
  switch (type) {
    case GAME_SUBTRACTION:
      return prepareQuestionsSubtraction(from, to, count);

    case GAME_MULTIPLICATION:
      return prepareQuestionsMultiplication(from, to, count);

    case GAME_DIVISION:
      return prepareQuestionsDivision(from, to, count);

    case GAME_ADDITION:
      return prepareQuestionsAddition(from, to, count);

    default:
      // Unknown game type: return an empty list instead of `undefined`
      // (the caller used to crash on `questions[0].operation`).
      return [];
  }
};

export const prepareQuestionsDivision = (
  from: number,
  to: number,
  questionCount: number,
) => {
  // initiate the game
  const questions: TQuestion[] = [];
  for (let index = 0; index < questionCount; index++) {
    let a = randomRange(from, to, false),
      b = randomRange(from, to, false);
    const mul = a * b,
      result = b,
      ask = randomOption(["result", "a", "b"] as const) as TAskOption;

    b = a;
    a = mul;

    const correct = ask === "result" ? result : ask === "a" ? a : b;
    // A divisor must stay positive, so its option pool starts at 1.
    const options = buildDistractors(correct, ask === "b" ? 1 : 0);

    questions.push({
      id: index,
      operandA: a,
      operandB: b,
      result: result,
      ask: ask,
      correct: correct,
      distractors: options,
      operation: "/",
    });
  }
  return questions;
};
/**
 * 
 * @param {number} from minimum number for question 
 * @param {number} to maximum number for question
 * @param {number} questionCount how many question
 * @returns {object}    {
            id: {number},
            operandA: {number},
            operandB: {number},
            result: {number},
            ask: {'result'|'a'|'b'},
            correct: {number},
            distractors: [number]
            operation: 'x',
        }
 */
export const prepareQuestionsMultiplication = (
  from: number,
  to: number,
  questionCount: number,
) => {
  // initiate the game
  const questions: TQuestion[] = [];
  for (let index = 0; index < questionCount; index++) {
    const a = randomRange(from, to),
      b = randomRange(from, to),
      result = a * b,
      ask = randomOption<TAskOption>(["result", "a", "b"]);
    const correct = ask === "result" ? result : ask === "a" ? a : b;
    const options = buildDistractors(correct);

    questions.push({
      id: index,
      operandA: a,
      operandB: b,
      result: result,
      ask: ask,
      correct: correct,
      distractors: options,
      operation: "x",
    });
  }
  return questions;
};

export const prepareQuestionsSubtraction = (
  from: number,
  to: number,
  questionCount: number,
) => {
  // initiate the game
  const questions: TQuestion[] = [];
  for (let index = 0; index < questionCount; index++) {
    let a = randomRange(from, to),
      b = randomRange(from, to);

    if (a < b) {
      //swap
      // a = b + (b = a, 0);
      [a, b] = [b, a];
    }

    const result = a - b,
      ask = randomOption<TAskOption>(["result", "a", "b"]);
    const correct = ask === "result" ? result : ask === "a" ? a : b;
    const options = buildDistractors(correct);

    questions.push({
      id: index,
      operandA: a,
      operandB: b,
      result: result,
      ask: ask,
      correct: correct,
      distractors: options,
      operation: "-",
    });
  }
  return questions;
};
/**
 * Prepares question for addition to answer
 * @param {number} from minimum value of equation operand
 * @param {number} to maximum value of equation operand
 * @param {number} count number of questions to generate
 */
export const prepareQuestionsAddition = (
  from: number,
  to: number,
  count: number,
) => {
  // initiate the game
  const questions: TQuestion[] = [];
  for (let index = 0; index < count; index++) {
    const a = randomRange(from, to),
      b = randomRange(from, to),
      result = a + b,
      ask = randomOption<TAskOption>(["result", "a", "b"]);
    const correct = ask === "result" ? result : ask === "a" ? a : b;
    const options = buildDistractors(correct);

    questions.push({
      id: index,
      operandA: a,
      operandB: b,
      result: result,
      ask: ask,
      correct: correct,
      distractors: options,
      operation: "+",
    });
  }
  return questions;
};
