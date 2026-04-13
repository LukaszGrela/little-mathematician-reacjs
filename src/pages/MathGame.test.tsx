import { fireEvent } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import { MathGame } from "./MathGame";
import { routerDecorator } from "../__tests/routerDecorator";
import { setupStore } from "../store/Store";
import { newGame } from "../actions/mathGameActions";

// beforeEach(() => {
//   newGame = jest.fn();
//   quitGame = jest.fn();
//   answerQuestion = jest.fn();
//   nextQuestion = jest.fn();
//   gameOver = jest.fn();
//   updateScore = jest.fn();
//   onAction = jest.fn();
//   config = {
//     general: {
//       questionCount: 10,
//       from: 0,
//       to: 10,
//     },
//   };
//   game = {
//     questionCount: 10,
//     from: 0,
//     to: 10,
//     type: "addition",
//     history: [],
//     hudQuestionCurrent: 1,
//     hudCorrectAnswers: 0,
//     questions: [
//       {
//         id: 0,
//         operandA: 6,
//         operandB: 1,
//         result: 7,
//         ask: "b",
//         correct: 1,
//         distractors: [6, 3, 1, 0],
//         operation: "+",
//       },
//       {
//         id: 1,
//         operandA: 2,
//         operandB: 7,
//         result: 9,
//         ask: "a",
//         correct: 2,
//         distractors: [2, 7, -3, 3],
//         operation: "+",
//       },
//       {
//         id: 2,
//         operandA: 10,
//         operandB: 7,
//         result: 17,
//         ask: "result",
//         correct: 17,
//         distractors: [21, 19, 16, 17],
//         operation: "+",
//       },
//       {
//         id: 3,
//         operandA: 9,
//         operandB: 3,
//         result: 12,
//         ask: "a",
//         correct: 9,
//         distractors: [9, 13, 4, 12],
//         operation: "+",
//       },
//       {
//         id: 4,
//         operandA: 4,
//         operandB: 0,
//         result: 4,
//         ask: "result",
//         correct: 4,
//         distractors: [7, 2, 4, 9],
//         operation: "+",
//       },
//       {
//         id: 5,
//         operandA: 6,
//         operandB: 1,
//         result: 7,
//         ask: "a",
//         correct: 6,
//         distractors: [7, 6, 10, 2],
//         operation: "+",
//       },
//       {
//         id: 6,
//         operandA: 0,
//         operandB: 6,
//         result: 6,
//         ask: "b",
//         correct: 6,
//         distractors: [10, 7, 6, 4],
//         operation: "+",
//       },
//       {
//         id: 7,
//         operandA: 6,
//         operandB: 7,
//         result: 13,
//         ask: "result",
//         correct: 13,
//         distractors: [10, 19, 13, 15],
//         operation: "+",
//       },
//       {
//         id: 8,
//         operandA: 5,
//         operandB: 4,
//         result: 9,
//         ask: "a",
//         correct: 5,
//         distractors: [6, 0, 11, 5],
//         operation: "+",
//       },
//       {
//         id: 9,
//         operandA: 2,
//         operandB: 0,
//         result: 2,
//         ask: "result",
//         correct: 2,
//         distractors: [6, 5, 1, 2],
//         operation: "+",
//       },
//     ],
//     operation: "+",
//   };
// });

vi.mock("../utils/math");

test("Should render MathGame correctly", () => {
  const store = setupStore();
  store.dispatch(
    newGame({
      type: "addition",
      general: {
        from: 0,
        to: 10,
        questionCount: 10,
      },
    }),
  );
  const { container } = routerDecorator({
    store,
    routerConfig: {
      initialEntries: ["/game/addition/"],
      initialIndex: 0,
    },
    path: `/game/addition/`,
    ui: <MathGame />,
  });

  expect(container).toMatchSnapshot();
});

test("Should answerQuestion be called", () => {
  const store = setupStore();
  store.dispatch(
    newGame({
      type: "addition",
      general: {
        from: 0,
        to: 10,
        questionCount: 10,
      },
    }),
  );

  const { queryAllByRole } = routerDecorator({
    store,
    routerConfig: {
      initialEntries: ["/game/addition/"],
      initialIndex: 0,
    },
    path: `/game/addition/`,
    ui: <MathGame />,
  });

  expect(
    store.getState().game.currentGame?.questions.at(0)?.answer,
  ).not.toBeDefined();

  const button = queryAllByRole("button");
  fireEvent.click(button[0]);

  const answer = store.getState().game.currentGame?.questions.at(0)?.answer;
  expect(answer).toBeDefined();
  expect(answer?.correct).toBeTruthy();
});

test("Should nextQuestion to be called", () => {
  const store = setupStore();
  store.dispatch(
    newGame({
      type: "addition",
      general: {
        from: 0,
        to: 10,
        questionCount: 10,
      },
    }),
  );

  const { getByTestId, queryAllByRole } = routerDecorator({
    store,
    routerConfig: {
      initialEntries: ["/game/addition/"],
      initialIndex: 0,
    },
    path: `/game/addition/`,
    ui: <MathGame />,
  });

  expect(store.getState().game.currentGame?.questions.at(0)).not.toBeNull();

  const answerButton = queryAllByRole("button");
  fireEvent.click(answerButton[0]);

  const button = getByTestId("Feedback-next");
  fireEvent.click(button);

  expect(store.getState().game.currentGame?.questions.at(0)).toBeNull();
});
