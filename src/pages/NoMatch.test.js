import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from './NoMatch';

test('Should render NoMatch page correctly', () => {
    const wrapper = shallow(<NoMatch />);

    expect(wrapper).toMatchSnapshot();
});
