import React from 'react';
import { shallow } from 'enzyme';
import GameAnswers from '../../components/GameAnswers';


let wrapper, onSelection, options, selectionId;
beforeEach(() => {
    onSelection = jest.fn();
    options = [4, 3, 2, 1];
    wrapper = shallow(<GameAnswers
        selectionId={selectionId}
        onSelection={onSelection}
        options={options} />);
});
test('Should GameAnswers to render correctly', () => {
    expect(wrapper).toMatchSnapshot();
});
// 
test('Should render corrent number of options', () => { 
    const buttons = wrapper.find('.answer');
    expect(buttons).toHaveLength(options.length);
});
// 
test('Should hide selected option', () => { 
    options.forEach((i,index) => {
        let selectionId = index + 1;
        wrapper.setProps({selectionId});
        let hidden = wrapper.find('.answer.hidden');
        expect(hidden).toHaveLength(1);
    });
});
// 
test('Should call onSelection with correct arguments', () => { 
    options.forEach((i,index) => {
        let id = index+1;
        let className = 'option-' + id;
        let button = wrapper.find('.answer.'+className);
        expect(button).toHaveLength(1);
        button.simulate('click');
        expect(onSelection).toHaveBeenLastCalledWith(i,id);
    }); 
});
//
test('Should GameAnswers className have locked when selectionId exists', () => {

    let locked = wrapper.find('.game-answers.locked');
    expect(locked).toHaveLength(0);    

    let selectionId = 1;
    wrapper.setProps({selectionId});
    locked = wrapper.find('.game-answers.locked');
    expect(locked).toHaveLength(1);    
});