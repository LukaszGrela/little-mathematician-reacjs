import { Menu } from "./Menu";
import {
  GAME_MULTIPLICATION,
  GAME_ADDITION,
  GAME_SUBTRACTION,
  GAME_DIVISION,
} from "../gameTypes";
import { expect, vi } from "vitest";
import { storeDecorator } from "../__tests/storeDecorator";
import { fireEvent } from "@testing-library/dom";
import { setupStore } from "../store/Store";
import { increaseScoreOfGame } from "../actions/actions";

test("Should render Menu correctly", () => {
  const { container } = storeDecorator(<Menu onAction={vi.fn()} />);
  expect(container).toMatchSnapshot();
});

test("Should onAction be called", () => {
  const onAction = vi.fn();
  const { queryByLabelText } = storeDecorator(<Menu onAction={onAction} />);

  expect(onAction).not.toHaveBeenCalled();

  // multiplication
  let element = queryByLabelText("Multiplication game");
  expect(element).toBeInTheDocument();

  fireEvent.click(element!);

  expect(onAction).toHaveBeenLastCalledWith(GAME_MULTIPLICATION);

  // division
  element = queryByLabelText("Division game");
  expect(element).toBeInTheDocument();

  fireEvent.click(element!);

  expect(onAction).toHaveBeenLastCalledWith(GAME_DIVISION);

  // addition
  element = queryByLabelText("Addition game");
  expect(element).toBeInTheDocument();

  fireEvent.click(element!);

  expect(onAction).toHaveBeenLastCalledWith(GAME_ADDITION);

  // subtraction
  element = queryByLabelText("Subtraction game");
  expect(element).toBeInTheDocument();

  fireEvent.click(element!);

  expect(onAction).toHaveBeenLastCalledWith(GAME_SUBTRACTION);
});

test("Should badge display correct value", () => {
  const store = setupStore();

  store.dispatch(increaseScoreOfGame(1, "addition"));
  store.dispatch(increaseScoreOfGame(2, "subtraction"));
  store.dispatch(increaseScoreOfGame(3, "multiplication"));
  store.dispatch(increaseScoreOfGame(4, "division"));

  const { container } = storeDecorator(
    <Menu onAction={vi.fn()} />,
    undefined,
    store,
  );
  expect(container).toMatchSnapshot();
});
