import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../../pages/Menu';

let wrapper,
    onAction,
    element,
    stats = {
        division: '0',
        multiplication: '1',
        subtraction: '2',
        addition: '3',
    };

beforeEach(() => {
    onAction = jest.fn();
    wrapper = shallow(<Menu
        stats={stats}
        onAction={onAction} />);

})

test('Should render Menu correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should onAction be called with "multiply" argument on multiplication button click', () => {
    element = wrapper.find('button.multiplication');
    expect(element.length).toBe(1);
    element.simulate('click');
    expect(onAction).toHaveBeenLastCalledWith('multiply');
});
test('Should onAction be called with "divide" argument on division button click', () => {

    element = wrapper.find('button.division');
    expect(element.length).toBe(1);
    element.simulate('click');
    expect(onAction).toHaveBeenLastCalledWith('divide');
});
test('Should onAction be called with "plus" argument on addition button click', () => {

    element = wrapper.find('button.addition');
    expect(element.length).toBe(1);
    element.simulate('click');
    expect(onAction).toHaveBeenLastCalledWith('plus');
});
test('Should onAction be called with "minus" argument on subtraction button click', () => {

    element = wrapper.find('button.subtraction');
    expect(element.length).toBe(1);
    element.simulate('click');
    expect(onAction).toHaveBeenLastCalledWith('minus');
});

test('Should addition badge display correct value', () => {
    element = wrapper.find('.addition span.badge');
    expect(element.length).toBe(1);
    expect(element.text()).toEqual(stats.addition);
});

test('Should subtraction badge display correct value', () => {
    element = wrapper.find('.subtraction span.badge');
    expect(element.length).toBe(1);
    expect(element.text()).toEqual(stats.subtraction);
});

test('Should multiplication badge display correct value', () => {
    element = wrapper.find('.multiplication span.badge');
    expect(element.length).toBe(1);
    expect(element.text()).toEqual(stats.multiplication);
});

test('Should division badge display correct value', () => {
    element = wrapper.find('.division span.badge');
    expect(element.length).toBe(1);
    expect(element.text()).toEqual(stats.division);
});