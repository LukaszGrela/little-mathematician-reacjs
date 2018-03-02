import React from 'react';
import { shallow } from 'enzyme';
import Equation from '../../components/Equation';

let wrapper, operation, userAnswer,
    questions = {
        id: 0,
        operandA: 1,
        operandB: 2,
        result: 3,
        ask: "result",
        correct: 3,
        distractors: [1, 2, 3, 4],
        operation: '+',
    };
beforeEach(() => {
    operation = 'A';
    userAnswer = { correct: true };
    wrapper = shallow(<Equation
        {...questions} />);
})

test('Should render Equation correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should Equation set operation correctly', () => {
    wrapper.setProps({ operation: '-' });
    let div = wrapper.find('.operation');
    expect(div).toHaveLength(1);
    expect(div.text()).toBe("-");

    wrapper.setProps({ operation: '+' });
    div = wrapper.find('.operation');
    expect(div).toHaveLength(1);
    expect(div.text()).toBe("+");
});

test('Should Equation put "?" in the operand A', () => {
    wrapper.setProps({ ask: 'a' });
    const div = wrapper.find('.operand-a.question');
    expect(div).toHaveLength(1);

    expect(div.text()).toBe("?");
});
test('Should Equation put "userAnswer" value in the operand A', () => {
    const user = 10;
    wrapper.setProps({ ask: 'a', answer: { user } });
    const div = wrapper.find('.operand-a.question');
    expect(div).toHaveLength(1);

    expect(div.text()).toBe("" + user);
});

test('Should Equation put "?" in the operand B', () => {
    wrapper.setProps({ ask: 'b' });
    const div = wrapper.find('.operand-b.question');
    expect(div).toHaveLength(1);

    expect(div.text()).toBe("?");
});
test('Should Equation put "userAnswer" value in the operand B', () => {
    const user = 10;
    wrapper.setProps({ ask: 'b', answer: { user } });
    const div = wrapper.find('.operand-b.question');
    expect(div).toHaveLength(1);

    expect(div.text()).toBe("" + user);
});

test('Should Equation put "?" in the result', () => {

    const div = wrapper.find('.result.question');
    expect(div).toHaveLength(1);

    expect(div.text()).toBe("?");
});
test('Should Equation put "userAnswer" value in the result', () => {
    const user = 10;
    wrapper.setProps({ answer: { user } });
    const div = wrapper.find('.result.question');
    expect(div).toHaveLength(1);

    expect(div.text()).toBe("" + user);
});

test('Should Equation className NOT have correct or incorrect class', () => {

    let div = wrapper.find('.equation.correct');
    expect(div).toHaveLength(0);
    
    div = wrapper.find('.equation.incorrect');
    expect(div).toHaveLength(0);
    
});
test('Should Equation className have proper correct/incorrect class', () => {

    wrapper.setProps({ answer: { correct:true } });
    let div = wrapper.find('.equation.correct');
    expect(div).toHaveLength(1);
    
    wrapper.setProps({ answer: { correct:false } });
    div = wrapper.find('.equation.incorrect');
    expect(div).toHaveLength(1);
    
});