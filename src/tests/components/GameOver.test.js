import React from 'react';
import { shallow } from 'enzyme';
import GameOver from '../../components/GameOver';

let wrapper, onAction, hudCorrectAnswers;

beforeEach(() => {
    onAction = jest.fn();
    hudCorrectAnswers = 10;
    wrapper = shallow(<GameOver
        onAction={onAction}
        hudCorrectAnswers={hudCorrectAnswers}
    />);
})

test('should render GameOver correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render GameOver correctly with 1 correct answer', () => {
    wrapper.setProps({
        hudCorrectAnswers:1
    });
    expect(wrapper).toMatchSnapshot();
});


test('should call onAction to go to menu', () => {
    const button = wrapper.find('button.menu-button');

    //find one
    expect(button.length).toBe(1);
    //call action
    button.simulate('click');
    //
    expect(onAction).toHaveBeenLastCalledWith('menu');
});


test('should call onAction to reply game', () => {
    const button = wrapper.find('button.replay-button');

    //find one
    expect(button.length).toBe(1);
    //call action
    button.simulate('click');
    //
    expect(onAction).toHaveBeenLastCalledWith('replay');
});
