import { render } from "@testing-library/react";
import Equation from "./Equation";

// let wrapper, operation, userAnswer,
const questions = {
  id: 0,
  operandA: 1,
  operandB: 2,
  result: 3,
  ask: "result" as const,
  correct: 3,
  distractors: [1, 2, 3, 4],
  operation: "+" as const,
};
// beforeEach(() => {
//     operation = 'A';
//     userAnswer = { correct: true };
//     wrapper = shallow(<Equation
//         {...questions} />);
// })

test("Should render Equation correctly", () => {
  const { container } = render(<Equation {...questions} />);
  expect(container).toMatchSnapshot();
});

test('Should Equation put "?" in the operand A', () => {
  const { container } = render(<Equation {...questions} ask="a" />);
  expect(container).toMatchSnapshot();
});
test('Should Equation put "?" in the operand B', () => {
  const { container } = render(<Equation {...questions} ask="b" />);
  expect(container).toMatchSnapshot();
});
test('Should Equation put "?" in the result', () => {
  const { container } = render(<Equation {...questions} ask="result" />);
  expect(container).toMatchSnapshot();
});

test('Should Equation put "userAnswer" value in the operand A', () => {
  const user = 1979;

  const { container } = render(
    <Equation
      {...questions}
      ask="a"
      answer={{ user, selectionId: 1, correct: false }}
    />,
  );
  expect(container).toMatchSnapshot();
});

test('Should Equation put "userAnswer" value in the operand B', () => {
  const user = 1979;

  const { container } = render(
    <Equation
      {...questions}
      ask="b"
      answer={{ user, selectionId: 1, correct: false }}
    />,
  );
  expect(container).toMatchSnapshot();
});

test('Should Equation put "userAnswer" value in the result', () => {
  const user = 1979;

  const { container } = render(
    <Equation
      {...questions}
      ask="result"
      answer={{ user, selectionId: 1, correct: true }}
    />,
  );
  expect(container).toMatchSnapshot();
});
