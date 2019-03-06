import React from 'react';
import { shallow } from 'enzyme';
import GameHud from '../../components/GameHud';
import { GAME_ADDITION } from '../../gameTypes';

let wrapper, type, state;

beforeEach(() => {
    type = GAME_ADDITION;
    state = {
        hudCorrectAnswers: 0,
        hudQuestionCurrent: 1,
        questionCount: 1,
        type
    };
    wrapper = shallow(<GameHud
        {...state}
        type={type}
    />);
})
test('Should render GameHud correctly', () => {
    expect(wrapper).toMatchSnapshot();
});
test('Should render GameHud correctly with different props', () => {
    wrapper.setProps({
        hudQuestionCurrent:2,
        hudCorrectAnswers:3,
        questionCount:10
    });
    expect(wrapper).toMatchSnapshot();
});
// 
test('Should GameHud className contain prop type class', () => {
    const type = 'my-type';
    wrapper.setProps({
        type
    });
    expect(wrapper.find('.game-hud.'+type)).toHaveLength(1);
});
// 
test('Should GameHud className contain gain-even class', () => {
    let hudCorrectAnswers = 2;
    wrapper.setProps({
        hudCorrectAnswers
    });
    expect(wrapper.find('.game-hud.gain-even')).toHaveLength(1);
});
// 
test('Should GameHud className contain gain-odd class', () => {
    const hudCorrectAnswers = 3;
    wrapper.setProps({
        hudCorrectAnswers
    });
    expect(wrapper.find('.game-hud.gain-odd')).toHaveLength(1);
});
// 
test('Should GameHud display progress correctly', () => {
    const hudQuestionCurrent = 5;
    const questionCount = 10;
    wrapper.setProps({
        hudQuestionCurrent,
        questionCount,
    });
    const progress = wrapper.find('.question-counter');
    expect(progress).toHaveLength(1);

    expect(progress.text()).toBe(`${hudQuestionCurrent} / ${questionCount}`);
});
//
test('Should GameHud display correct answers number correctly', () => {
    const hudCorrectAnswers = 10;
    wrapper.setProps({
        hudCorrectAnswers
    });
    const score = wrapper.find('.correct-answers span');
    expect(score).toHaveLength(1);

    expect(score.text()).toBe(`${hudCorrectAnswers}`);
  
});