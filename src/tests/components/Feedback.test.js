import React from 'react';
import { shallow } from 'enzyme';
import Feedback from '../../components/Feedback';

let wrapper, correct, answer, onAction;
beforeEach(() => {
    correct = 'A';
    answer = { correct: true };
    onAction = jest.fn();
    wrapper = shallow(<Feedback
        correct={correct}
        answer={answer}
        onAction={onAction} />);
})

test('Should render Feedback correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render Feedback correctly on wrong answer', () => {
    wrapper.setProps({ correct: 'B', answer: { correct: false } });
    expect(wrapper).toMatchSnapshot();
});

test('Should the Feedback display correct answer', () => {
    const value = 'B';
    wrapper.setProps({ correct: value, answer: { correct: false } });
    const span = wrapper.find('span.correct-answer');
    expect(span.length).toBe(1);
    expect(span.text()).toBe(value);
});

test('Should the Feedback display not good Mood', () => {
    const value = 'B';
    wrapper.setProps({ correct: value, answer: { correct: false } });
    const mood = wrapper.find('MoodIcon.cell');
    expect(mood.length).toBe(1);
    expect(mood.prop('isGood')).toBe(false);
});

test('Should the Feedback className have incorrect', () => {
    const value = 'B';
    wrapper.setProps({ correct: value, answer: { correct: false } });
    expect(wrapper.find('.feedback.incorrect')).toHaveLength(1);
    //and revert
    wrapper.setProps({ correct: value, answer: { correct: true } });
    expect(wrapper.find('.feedback.incorrect')).toHaveLength(0);
});

test('Should the button trigger onAction call', () => {
    const button = wrapper.find('button.cell');
    expect(button).toHaveLength(1);
    // simulate click
    button.simulate('click');
    expect(onAction).toBeCalled();
});