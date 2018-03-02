import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

test('should render Footer correctly', () => {

    const wrapper = shallow(<Footer />);
    wrapper.setState({ currentYear: 2018 });
    expect(wrapper).toMatchSnapshot();
});

test('should render Footer correctly with different year', () => {

    const wrapper = shallow(<Footer />);
    wrapper.setState({ currentYear: 2019 });
    expect(wrapper).toMatchSnapshot();
})