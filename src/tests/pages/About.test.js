import React from 'react';
import { shallow } from 'enzyme';
import About from '../../pages/About';

test('Should render About page correctly', () => {
    const wrapper = shallow(<About />);

    expect(wrapper).toMatchSnapshot();
});