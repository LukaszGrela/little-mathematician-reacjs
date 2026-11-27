import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import GameAnswers from "./GameAnswers";

test("Should GameAnswers to render correctly", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];
  const selectionId = undefined;

  const { container } = render(
    <GameAnswers
      selectionId={selectionId}
      onSelection={onSelection}
      options={options}
    />,
  );
  expect(container).toMatchSnapshot();
});
//
test("Should render corrent number of options", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];
  const selectionId = undefined;

  render(
    <GameAnswers
      selectionId={selectionId}
      onSelection={onSelection}
      options={options}
    />,
  );
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(options.length);
});
//
test("Should hide selected option", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];

  options.forEach((_, index) => {
    const { container } = render(
      <GameAnswers
        selectionId={index + 1}
        onSelection={onSelection}
        options={options}
      />,
    );
    const hidden = container.querySelectorAll(".answer.hidden");
    expect(hidden).toHaveLength(1);
  });
});
//
test("Should call onSelection with correct arguments", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];
  const selectionId = undefined;

  render(
    <GameAnswers
      selectionId={selectionId}
      onSelection={onSelection}
      options={options}
    />,
  );
  options.forEach((option, index) => {
    const id = index + 1;
    const button = screen.getByText(option.toString());
    fireEvent.click(button);
    expect(onSelection).toHaveBeenCalledWith(option, id);
  });
});
//
test("Should GameAnswers className have locked when selectionId exists", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];
  const selectionId = undefined;

  const { container, rerender } = render(
    <GameAnswers
      selectionId={selectionId}
      onSelection={onSelection}
      options={options}
    />,
  );

  let locked = container.querySelector(".game-answers.locked");
  expect(locked).toBeNull();

  rerender(
    <GameAnswers selectionId={1} onSelection={onSelection} options={options} />,
  );
  locked = container.querySelector(".game-answers.locked");
  expect(locked).toBeInTheDocument();
});
//
test("Should expose the answers as an accessible group", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];

  render(
    <GameAnswers
      selectionId={undefined}
      onSelection={onSelection}
      options={options}
    />,
  );

  const group = screen.getByRole("group", { name: "Answer options" });
  expect(group).toBeInTheDocument();

  screen.getAllByRole("button").forEach((button) => {
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
//
test("Should mark the picked answer as pressed", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];

  render(
    <GameAnswers selectionId={2} onSelection={onSelection} options={options} />,
  );

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(4);
  const pressed = buttons.filter(
    (button) => button.getAttribute("aria-pressed") === "true",
  );
  expect(pressed).toHaveLength(1);
  expect(pressed[0]).toHaveTextContent("3");
});
//
test("Should advertise the 1-4 keyboard shortcuts for the answers", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];

  render(
    <GameAnswers
      selectionId={undefined}
      onSelection={onSelection}
      options={options}
    />,
  );

  const buttons = screen.getAllByRole("button");
  expect(buttons.map((button) => button.getAttribute("aria-keyshortcuts"))).toEqual(
    ["1", "2", "3", "4"],
  );
});

test("Should describe the answer group with the keyboard hint", () => {
  const onSelection = vi.fn();
  const options = [4, 3, 2, 1];

  render(
    <GameAnswers
      selectionId={undefined}
      onSelection={onSelection}
      options={options}
    />,
  );

  const group = screen.getByRole("group", { name: "Answer options" });
  expect(group).toHaveAttribute("aria-describedby", "game-answers-hint");

  const hint = document.getElementById("game-answers-hint");
  expect(hint).not.toBeNull();
  expect(hint).toHaveClass("visually-hidden");
  expect(hint).toHaveTextContent(/Press 1 to 4 to choose an answer/);
  expect(hint).toHaveTextContent(/press Enter for the next question/);
});
