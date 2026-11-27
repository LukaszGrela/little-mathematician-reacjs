import { expect, test } from "vitest";
import { act, screen } from "@testing-library/react";

import { History } from "./History";
import { storeDecorator } from "../__tests/storeDecorator";
import { setupStore } from "../store/Store";
import {
  newGame,
  nextQuestion,
  gameOver,
  quitGame,
} from "../actions/mathGameActions";
import { GAME_ADDITION, GAME_SUBTRACTION } from "../gameTypes";

const startGame = (
  store: ReturnType<typeof setupStore>,
  type: typeof GAME_ADDITION | typeof GAME_SUBTRACTION,
) => {
  act(() => {
    store.dispatch(
      newGame({ general: { questionCount: 10, from: 0, to: 10 }, type }),
    );
  });
};

test("renders the empty state without any closed game", () => {
  storeDecorator(<History />);

  expect(
    screen.getByText(/No finished games yet/i),
  ).toBeInTheDocument();
  expect(screen.queryAllByTestId("history-row")).toHaveLength(0);
});

test("lists a closed game with the number of answered questions", () => {
  const store = setupStore();
  storeDecorator(<History />, undefined, store);

  startGame(store, GAME_ADDITION);

  act(() => {
    store.dispatch(nextQuestion());
    store.dispatch(nextQuestion());
    store.dispatch(gameOver());
  });

  const rows = screen.getAllByTestId("history-row");
  expect(rows).toHaveLength(1);

  const cells = rows[0].querySelectorAll("td");
  expect(cells[0]).toHaveTextContent("Addition");
  expect(cells[1]).toHaveTextContent("0");
  // two questions were shown, so one was answered - not 1/1 by the game length
  expect(cells[2]).toHaveTextContent("2");
  expect(cells[3]).toHaveTextContent("10");
  expect(cells[5]).toHaveTextContent("Finished");
});

test("keeps an abandoned game visible as abandoned", () => {
  const store = setupStore();
  storeDecorator(<History />, undefined, store);

  startGame(store, GAME_SUBTRACTION);

  act(() => {
    store.dispatch(quitGame());
  });

  const rows = screen.getAllByTestId("history-row");
  expect(rows).toHaveLength(1);
  expect(rows[0].querySelectorAll("td")[5]).toHaveTextContent("Abandoned");
});
