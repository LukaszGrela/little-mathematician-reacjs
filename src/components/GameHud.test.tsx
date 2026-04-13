import GameHud from "./GameHud";
import { render } from "@testing-library/react";

test("Should render GameHud correctly", () => {
  const { container } = render(
    <GameHud
      hudCorrectAnswers={0}
      hudQuestionCurrent={2}
      questionCount={3}
      type="addition"
    />,
  );
  expect(container).toMatchSnapshot();
});

test("Should render GameHud correctly with different props", () => {
  const { container } = render(
    <GameHud
      hudCorrectAnswers={3}
      hudQuestionCurrent={2}
      questionCount={10}
      type="addition"
    />,
  );
  expect(container).toMatchSnapshot();
});
//
test("Should GameHud className contain gain-even class", () => {
  const { container } = render(
    <GameHud
      hudCorrectAnswers={2}
      hudQuestionCurrent={2}
      questionCount={10}
      type="addition"
    />,
  );
  expect(container).toMatchSnapshot();
});
