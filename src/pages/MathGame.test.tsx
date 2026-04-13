import { fireEvent } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import { MathGame } from "./MathGame";
import { routerDecorator } from "../__tests/routerDecorator";
import { setupStore } from "../store/Store";
import { newGame } from "../actions/mathGameActions";

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
