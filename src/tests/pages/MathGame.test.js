import React from 'react';
import { shallow } from 'enzyme';
import { MathGame } from '../../pages/MathGame';
import { GAME_ADDITION } from '../../gameTypes';

let wrapper, newGame,quitGame;

beforeEach(() => {
    newGame = jest.fn();
    quitGame = jest.fn();
    wrapper = shallow(<MathGame
        type={GAME_ADDITION}
        newGame={newGame}
        quitGame={quitGame}
    />);

})

test('Should render MathGame correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should call the newGame method', () => {
    expect(newGame).toHaveBeenCalled();
})
// test('', () => { });