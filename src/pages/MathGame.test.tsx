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

test("Should answer the question with a 1-4 keyboard shortcut", () => {
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

  const { unmount } = routerDecorator({
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

  fireEvent.keyDown(window, { key: "1" });

  expect(
    store.getState().game.currentGame?.questions.at(0)?.answer,
  ).toBeDefined();

  // the shortcut is ignored once the question is answered and the listener is
  // removed on unmount (no leaking window handler between games)
  const answered = store.getState().game.currentGame?.questions.at(0)?.answer;
  fireEvent.keyDown(window, { key: "2" });
  expect(store.getState().game.currentGame?.questions.at(0)?.answer).toBe(
    answered,
  );

  unmount();
});

const setupGame = () => {
  const store = setupStore();
  store.dispatch(
    newGame({
      type: "addition",
      general: { from: 0, to: 10, questionCount: 10 },
    }),
  );

  const api = routerDecorator({
    store,
    routerConfig: { initialEntries: ["/game/addition/"], initialIndex: 0 },
    path: `/game/addition/`,
    ui: <MathGame />,
  });

  return { store, ...api };
};

test("Should advance to the next question with the Enter key", () => {
  const { store, unmount } = setupGame();

  fireEvent.keyDown(window, { key: "1" });
  expect(
    store.getState().game.currentGame?.questions.at(0)?.answer,
  ).toBeDefined();

  fireEvent.keyDown(window, { key: "Enter" });

  expect(store.getState().game.currentGame?.questions.at(0)).toBeNull();
  expect(store.getState().game.hudQuestionCurrent).toBe(2);

  unmount();
});

test("Should ignore the Enter key before the question is answered", () => {
  const { store, unmount } = setupGame();

  fireEvent.keyDown(window, { key: "Enter" });

  expect(store.getState().game.hudQuestionCurrent).toBe(1);
  expect(
    store.getState().game.currentGame?.questions.at(0),
  ).not.toBeNull();

  unmount();
});

test("Should not advance twice when Enter comes from the focused button", () => {
  const { store, getByTestId, unmount } = setupGame();

  fireEvent.keyDown(window, { key: "2" });
  const nextButton = getByTestId("Feedback-next");

  // the feedback button receives focus after answering...
  expect(document.activeElement).toBe(nextButton);

  // ...so its own Enter is a native click, not an extra window shortcut
  fireEvent.keyDown(nextButton, { key: "Enter" });
  fireEvent.click(nextButton);

  expect(store.getState().game.hudQuestionCurrent).toBe(2);

  unmount();
});

test("Should move focus back to the first answer of the next question", () => {
  const { store, unmount } = setupGame();

  fireEvent.keyDown(window, { key: "1" });
  fireEvent.keyDown(window, { key: "Enter" });

  const firstAnswer = document.querySelector<HTMLButtonElement>(".answer");
  expect(store.getState().game.hudQuestionCurrent).toBe(2);
  expect(firstAnswer).not.toBeNull();
  expect(document.activeElement).toBe(firstAnswer);

  unmount();
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

test("Should redirect to the home page for an unknown game type", () => {
  const store = setupStore();
  store.dispatch(
    newGame({
      type: "addition",
      general: { from: 0, to: 10, questionCount: 10 },
    }),
  );

  const { queryByTestId, container } = routerDecorator({
    store,
    routerConfig: { initialEntries: ["/game/cokolwiek"], initialIndex: 0 },
    routes: [
      { path: "/", element: <div data-testid="home-page" /> },
      { path: "/game/:type", element: <MathGame /> },
    ],
  });

  expect(queryByTestId("home-page")).not.toBeNull();
  expect(container.querySelector(".game")).toBeNull();
});
