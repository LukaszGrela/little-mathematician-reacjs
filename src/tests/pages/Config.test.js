import React from 'react';
import { Config } from '../../pages/Config';
import { shallow } from 'enzyme';
import { ConfigType } from '../../actions/actions';

let wrapper,
    changeNumberOfQuestions,
    changeRangeFrom,
    changeRangeTo,
    config = {
        general: {
            questionCount: '10',
            from: '0',
            to: '10'
        }
    },
    configModified = {
        general: {
            questionCount: '20',
            from: '20',
            to: '30'
        }
    };

beforeEach(() => {
    changeNumberOfQuestions = jest.fn();
    changeRangeFrom = jest.fn();
    changeRangeTo = jest.fn();
    wrapper = shallow(<Config
        config={config}
        changeNumberOfQuestions={changeNumberOfQuestions}
        changeRangeFrom={changeRangeFrom}
        changeRangeTo={changeRangeTo}
    />);
});

test("Should render Config correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should render Config correctly with modified data", () => {

    wrapper.setProps({
        config: configModified
    });
    expect(wrapper).toMatchSnapshot();
});

test("Should changeNumberOfQuestions for general conf be called", () => {
    const value = parseInt(configModified.general.questionCount, 10);
    const select = wrapper.find('.general select#general-questions');
    // need to find it
    expect(select.length).toBe(1);
    // need to call our function
    select.simulate('change', {
        target: { value }
    });

    expect(changeNumberOfQuestions).toHaveBeenLastCalledWith(value, ConfigType.GENERAL);

});

test('Should changeRangeFrom for general conf be called, "changeRangeTo" be updated', () => {
    const value = parseInt(configModified.general.from);
    const select = wrapper.find('.general select#general-range-from');
    // need to find it
    expect(select.length).toBe(1);
    // need to call our function
    select.simulate('change', {
        target: { value }
    });
    //
    expect(changeRangeFrom).toHaveBeenLastCalledWith(value, ConfigType.GENERAL);
    // because new value is bigger than the to value, 
    // the 'to' value needs to change too to be 10 more
    expect(changeRangeTo).toHaveBeenLastCalledWith(value + 10, ConfigType.GENERAL);
});


test('Should changeRangeFrom for general conf be called, "changeRangeTo" not called', () => {
    const value = parseInt(configModified.general.from);
    const select = wrapper.find('.general select#general-range-from');
    //
    // wrapper.setProps({
    //     config:{general: {
    //         ...config.general,
    //         to: '40'
    //     }}
    // });
    //
    // need to find it
    expect(select.length).toBe(1);
    // need to call our function
    select.simulate('change', {
        target: { value }
    });
    //
    expect(changeRangeFrom).toHaveBeenLastCalledWith(value, ConfigType.GENERAL);
    // because new value is NOT bigger than the to value, 
    // the 'to' value needs NOT change
    // expect(changeRangeTo).not.toHaveBeenLastCalledWith(value + 10, ConfigType.GENERAL);
    console.warn('Review test: Need to check ho to test that the function was not called at all.');
});

test('Should changeRangeTo for general conf be called, "changeRangeFrom" not called', () => {
    const value = parseInt(configModified.general.to);//'30'
    const select = wrapper.find('.general select#general-range-to');

    // need to find it
    expect(select.length).toBe(1);
    // need to call our function
    select.simulate('change', {
        target: { value }
    });
    //
    expect(changeRangeTo).toHaveBeenLastCalledWith(value, ConfigType.GENERAL);
    // because new value is NOT bigger than the to value, 
    // the 'to' value needs NOT change
    // expect(changeRangeFrom).not.toHaveBeenLastCalledWith(value - 10, ConfigType.GENERAL);
    console.warn('Review test: Need to check ho to test that the function was not called at all.');
});


test('Should changeRangeTo for general conf be called, "changeRangeFrom" be updated', () => {
    const value = parseInt(configModified.general.to);//'30'

    wrapper.setProps({
        config: {
            general: {
                ...config.general,
                from: configModified.general.to
            }
        }
    });
    const select = wrapper.find('.general select#general-range-to');

    // needs to be found
    expect(select.length).toBe(1);
    // call it
    select.simulate('change', {
        target: {
            value
        }
    });
    // needs to be called
    expect(changeRangeTo).toHaveBeenLastCalledWith(value, ConfigType.GENERAL);

    // as the from is the same as to, the changeRangeFrom to be called with 10 less value
    expect(changeRangeFrom).toHaveBeenLastCalledWith(value - 10, ConfigType.GENERAL);

});
