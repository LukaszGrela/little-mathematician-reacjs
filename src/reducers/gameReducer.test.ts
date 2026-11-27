import { expect, test, vi } from "vitest";
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
  const prevState = {
    ...defaultState,
    currentGame,
  };
  const state = gameReducer(prevState, gameOver());

  expect(state.currentGame).toBeNull();

  expect(state.history.length).toBeGreaterThan(0);

  // new entry, without questions
  expect(state.history[0]).toEqual({ ...currentGame, questions: [] });
  expect(state.history[0]).not.toBe(currentGame);
  // questions reset to be empty array
  expect(state.history[0].questions).toHaveLength(0);
  // previous state is untouched (no in-place mutation)
  expect(prevState.currentGame?.questions).toHaveLength(3);
  expect(state).not.toBe(prevState);
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

  expect(state.history[0]).toEqual({ ...currentGame, questions: [] });
  // capped entries keep the newest first order
  expect(state.history[0].questions).toHaveLength(0);
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

test("should ignore ANSWER_QUESTION when the current question is missing", () => {
  const prevState = {
    currentGame: {
      hudQuestionCurrent: 1,
      hudCorrectAnswers: 0,
      questions: [],
    },
  } as unknown as TGameState;

  expect(gameReducer(prevState, answerQuestion(1, 1))).toBe(prevState);
});

test("should ignore NEXT_QUESTION when the current question is missing", () => {
  const prevState = {
    currentGame: {
      history: [],
      hudQuestionCurrent: 1,
      questions: [],
    },
  } as unknown as TGameState;

  expect(gameReducer(prevState, nextQuestion())).toBe(prevState);
});

test("should not mutate the previous state on ANSWER_QUESTION", () => {
  const question = { id: 0, correct: 1 } as TQuestion;
  const questions = [question];
  const game = {
    type: GAME_ADDITION,
    history: [],
    hudQuestionCurrent: 1,
    hudCorrectAnswers: 0,
    questions,
    operation: "+",
    questionCount: 1,
    from: 0,
    to: 10,
  } as unknown as TGameObject;
  const prevState: TGameState = { ...defaultState, currentGame: game };
  const snapshot = JSON.parse(JSON.stringify(prevState));

  const state = gameReducer(prevState, answerQuestion(1, 1));

  // previous state and its shared question array/object stay untouched
  expect(prevState).toEqual(snapshot);
  expect(prevState.currentGame).toBe(game);
  expect(game.questions).toBe(questions);
  expect(question.answer).toBeUndefined();

  // new answer lives on a new object in a new array
  const answered = state.currentGame?.questions[0];
  expect(answered).not.toBe(question);
  expect(answered?.answer).toEqual({ user: 1, correct: true, selectionId: 1 });
  expect(state.currentGame?.questions).not.toBe(questions);
  expect(state.currentGame?.hudCorrectAnswers).toBe(1);
  expect(state.currentGame?.history).toBe(game.history);

  // a second answer on the same state does not accumulate score in place
  const second = gameReducer(prevState, answerQuestion(2, 2));
  expect(second.currentGame?.hudCorrectAnswers).toBe(0);
  expect(second.currentGame?.questions[0]?.answer).toEqual({
    user: 2,
    correct: false,
    selectionId: 2,
  });
});

test("should not mutate the previous state on NEXT_QUESTION", () => {
  const question = {
    id: 0,
    correct: 1,
    answer: { user: 1, correct: true, selectionId: 1 },
  } as TQuestion;
  const history: TQuestion[] = [];
  const questions = [question];
  const game = {
    type: GAME_ADDITION,
    history,
    hudQuestionCurrent: 1,
    hudCorrectAnswers: 1,
    questions,
    operation: "+",
    questionCount: 1,
    from: 0,
    to: 10,
  } as unknown as TGameObject;
  const prevState: TGameState = { ...defaultState, currentGame: game };
  const snapshot = JSON.parse(JSON.stringify(prevState));

  const state = gameReducer(prevState, nextQuestion());

  // previous state keeps its arrays, no push and no in-place null assignment
  expect(prevState).toEqual(snapshot);
  expect(game.history).toBe(history);
  expect(history).toHaveLength(0);
  expect(game.questions).toBe(questions);
  expect(questions[0]).toBe(question);

  // new state owns new history and questions arrays
  expect(state.currentGame?.history).toEqual([question]);
  expect(state.currentGame?.history).not.toBe(history);
  expect(state.currentGame?.questions).not.toBe(questions);
  expect(state.currentGame?.questions[0]).toBeNull();
  expect(state.currentGame?.hudQuestionCurrent).toBe(2);
});

test("should not mutate the previous state on GAME_OVER", () => {
  const questions = [{ id: 0 } as TQuestion, { id: 1 } as TQuestion];
  const game: TGameObject = {
    type: GAME_ADDITION,
    history: [{ id: 2 } as TQuestion],
    hudQuestionCurrent: 2,
    hudCorrectAnswers: 1,
    questions,
    operation: "+",
    questionCount: 2,
    from: 0,
    to: 10,
  };
  const prevState: TGameState = {
    ...defaultState,
    currentGame: game,
  };
  const snapshot = JSON.parse(JSON.stringify(prevState));

  const state = gameReducer(prevState, gameOver());

  // previous state keeps its game, questions and history untouched
  expect(prevState).toEqual(snapshot);
  expect(prevState.currentGame).toBe(game);
  expect(prevState.currentGame?.questions).toBe(questions);
  expect(prevState.currentGame?.history).toHaveLength(1);

  // history entry is a new object with the game details and no questions
  expect(state.currentGame).toBeNull();
  expect(state.history[0]).not.toBe(game);
  expect(state.history[0]).toEqual({
    type: GAME_ADDITION,
    history: game.history,
    hudQuestionCurrent: 2,
    hudCorrectAnswers: 1,
    questions: [],
    operation: "+",
    questionCount: 2,
    from: 0,
    to: 10,
  });

  // history cap does not touch the source array either
  const capped = gameReducer(
    {
      ...defaultState,
      currentGame: game,
      history: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      ] as unknown as TGameObject[],
    },
    gameOver(),
  );
  expect(capped.history).toHaveLength(defaultState.historyLengthCap);
  expect(capped.history[0]).toEqual({ ...game, questions: [] });
  expect(capped.history[1]).toBe(0);
});
