import { test, vi } from "vitest";
import gameReducer, { type TGameState } from "./gameReducer";
import {
  quitGame,
  gameOver,
  newGame,
  answerQuestion,
  nextQuestion,
} from "../actions/mathGameActions";
import { generateGameObject } from "../gamelogic/gamelogic";
import { GAME_ADDITION } from "../gameTypes";
import type { TGameObject, TQuestion } from "../types";

vi.mock("../gamelogic/gamelogic");

const defaultState: TGameState = {
  history: [],
  currentGame: null,
  historyLengthCap: 10,
};
test("Should gameReducer set default state", () => {
  const state = gameReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(defaultState);
});

test("Should set currentGame to null for QUIT_GAME action", () => {
  const state = gameReducer(
    {
      ...defaultState,
      currentGame: {
        type: "addition",
        history: [],
        hudQuestionCurrent: 0,
        hudCorrectAnswers: 0,
        questions: [],
        operation: "+",
        questionCount: 0,
        from: 0,
        to: 0,
      },
    },
    quitGame(),
  );
  expect(state.currentGame).toBeNull();
});

test("should add currentGame to history and set currentGame to null for GAME_OVER action", () => {
  const currentGame: TGameObject = {
    questions: [0, 1, 2] as unknown as TQuestion[],
  } as TGameObject;
  const state = gameReducer(
    {
      ...defaultState,
      currentGame,
    },
    gameOver(),
  );

  expect(state.currentGame).toBeNull();

  expect(state.history.length).toBeGreaterThan(0);

  expect(state.history[0]).toEqual(currentGame);
  // questions reset to be empty array
  expect(state.history[0].questions).toHaveLength(0);
});

test("should add currentGame to history keep history within historyLengthCap limit for GAME_OVER action", () => {
  const currentGame: TGameObject = {
    questions: [0, 1, 2],
  } as unknown as TGameObject;
  const state = gameReducer(
    {
      ...defaultState,
      history: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      ] as unknown as TGameObject[],
      currentGame,
    },
    gameOver(),
  );

  expect(state.currentGame).toBeNull();

  expect(state.history.length).toBe(defaultState.historyLengthCap);

  expect(state.history[0]).toEqual(currentGame);
});

test("should set currentGame to be a new game object", () => {
  const config = {
    type: GAME_ADDITION,
    general: {
      questionCount: 10,
      from: 0,
      to: 10,
    },
  };

  const state = gameReducer(defaultState, newGame(config));
  //
  expect(state.currentGame).toEqual(generateGameObject(config));
});

test("should validate user answer on ANSWER_QUESTION action", () => {
  const prevState: TGameState = {
    currentGame: {
      hudQuestionCurrent: 1,
      hudCorrectAnswers: 0,
      questions: [
        {
          id: 0,
          correct: 1,
        } as TQuestion,
      ],
    },
  } as TGameState;
  const state = gameReducer(prevState, answerQuestion(1, 1));

  expect(state.currentGame?.hudCorrectAnswers).toBe(1);
  expect(state.currentGame?.questions?.[0]?.answer).not.toBeNull();
  expect(state.currentGame?.questions?.[0]?.answer).toEqual({
    user: 1,
    correct: true,
    selectionId: 1,
  });
});

test("should progress to next question on NEXT_QUESTION action", () => {
  const prevState = {
    currentGame: {
      history: [],
      hudQuestionCurrent: 1,
      questions: [
        {
          id: 0,
          correct: 1,
          answer: {
            user: 1,
            correct: true,
            selectionId: 1,
          },
        },
      ],
    },
  } as unknown as TGameState;
  const state = gameReducer(prevState, nextQuestion());

  expect(state.currentGame?.history).toHaveLength(1);
  expect(state.currentGame?.hudQuestionCurrent).toBe(2);
  expect(state.currentGame?.questions[0]).toBeNull();
});
