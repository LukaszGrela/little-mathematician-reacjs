import React from 'react';
import { shallow } from 'enzyme';
import { MathGame } from '../../pages/MathGame';

let wrapper;

beforeEach(() => {

    wrapper = shallow(<MathGame />);

})

test('Should render MathGame correctly', () => {
    // to be tested after game refactor
});
// test('', () => { });