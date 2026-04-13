import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import GameOver from "./GameOver";

test("should render GameOver correctly", () => {
  const hudCorrectAnswers = 10;
  const onAction = vi.fn();
  const { container } = render(
    <GameOver onAction={onAction} hudCorrectAnswers={hudCorrectAnswers} />,
  );
  expect(container).toMatchSnapshot();
});

test("should render GameOver correctly with 1 correct answer", () => {
  const hudCorrectAnswers = 1;
  const onAction = vi.fn();
  const { container } = render(
    <GameOver onAction={onAction} hudCorrectAnswers={hudCorrectAnswers} />,
  );
  expect(container).toMatchSnapshot();
});

test("should call onAction to go to menu", () => {
  const hudCorrectAnswers = 10;
  const onAction = vi.fn();

  render(
    <GameOver onAction={onAction} hudCorrectAnswers={hudCorrectAnswers} />,
  );
  const buttons = screen.getAllByRole("button");
  const menuButton = buttons[1]; // assuming menu is second

  fireEvent.click(menuButton);
  expect(onAction).toHaveBeenCalledWith("menu");
});

test("should call onAction to reply game", () => {
  const hudCorrectAnswers = 10;
  const onAction = vi.fn();

  render(
    <GameOver onAction={onAction} hudCorrectAnswers={hudCorrectAnswers} />,
  );
  const buttons = screen.getAllByRole("button");
  const replayButton = buttons[0]; // assuming replay is first

  fireEvent.click(replayButton);
  expect(onAction).toHaveBeenCalledWith("replay");
});
