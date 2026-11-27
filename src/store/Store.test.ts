import { expect, test } from "vitest";
import { setupStore } from "./Store";

test("Should setupStore create a store with the default state", () => {
  const state = setupStore().getState();
  expect(state.config.general).toEqual({ questionCount: 10, from: 0, to: 10 });
  expect(state.game.currentGame).toBeNull();
  expect(state.score).toEqual({
    addScore: 0,
    subScore: 0,
    mulScore: 0,
    divScore: 0,
  });
});
