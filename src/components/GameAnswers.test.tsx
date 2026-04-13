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
