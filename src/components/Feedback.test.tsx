import { render, screen, fireEvent } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import Feedback from "./Feedback";
import type { TAnswer } from "../types";

test("Should render Feedback correctly", () => {
  const answer = { correct: true } as TAnswer;
  const onAction = vi.fn();

  const { container } = render(
    <Feedback correct={1} answer={answer} onAction={onAction} />,
  );
  expect(container).toMatchSnapshot();
});

test("Should render Feedback correctly on wrong answer", () => {
  const onAction = vi.fn();
  const { container } = render(
    <Feedback
      correct={2}
      answer={{ correct: false } as TAnswer}
      onAction={onAction}
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Should the Feedback display correct answer", () => {
  const value = 2;
  const onAction = vi.fn();
  render(
    <Feedback
      correct={value}
      answer={{ correct: false } as TAnswer}
      onAction={onAction}
    />,
  );
  const span = screen.getByText(value.toString());
  expect(span).toBeInTheDocument();
  expect(span).toHaveClass("correct-answer");
});

test("Should the Feedback display not good Mood", () => {
  const value = 2;
  const onAction = vi.fn();
  render(
    <Feedback
      correct={value}
      answer={{ correct: false } as TAnswer}
      onAction={onAction}
    />,
  );
  // Since we can't check props in RTL, check the message instead
  expect(screen.getByText("Not so, correct answer is")).toBeInTheDocument();
});

test("Should the Feedback className have incorrect", () => {
  const value = 2;
  const onAction = vi.fn();
  const { container, rerender } = render(
    <Feedback
      correct={value}
      answer={{ correct: false } as TAnswer}
      onAction={onAction}
    />,
  );
  expect(container.querySelector(".feedback.incorrect")).toBeInTheDocument();
  // and revert
  rerender(
    <Feedback
      correct={value}
      answer={{ correct: true } as TAnswer}
      onAction={onAction}
    />,
  );
  expect(
    container.querySelector(".feedback.incorrect"),
  ).not.toBeInTheDocument();
});

test("Should the button trigger onAction call", () => {
  const answer = { correct: true } as TAnswer;
  const onAction = vi.fn();

  render(<Feedback correct={1} answer={answer} onAction={onAction} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(onAction).toHaveBeenCalled();
});
