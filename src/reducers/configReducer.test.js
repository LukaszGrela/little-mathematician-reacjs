import reducer from "../../reducers/configReducer";
import { changeNumberOfQuestions, ConfigType, changeRangeFrom, changeRangeTo } from "../../actions/actions";

const defaultState = {
    general: {
        questionCount: 10,
        from: 0,
        to: 10
    }
};

test('Should configReducer set default state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should the settings NOT be changed for invalid action', () => {
    
    let state = reducer(defaultState, { type: 'dummy' });
    expect(state).toEqual(defaultState);
    state = reducer(defaultState, changeNumberOfQuestions(100, 'unknown'));
    expect(state).toEqual(defaultState);

})

test('Should general questionCount be updated', () => {
    const state = reducer(defaultState, changeNumberOfQuestions(100, ConfigType.GENERAL));
    expect(state).toEqual({
        ...defaultState,
        general:{
            ...defaultState.general,
            questionCount: 100
        }
    })
});

test('Should general range from be updated', () => {
    const state = reducer(defaultState, changeRangeFrom(100, ConfigType.GENERAL));
    expect(state).toEqual({
        ...defaultState,
        general:{
            ...defaultState.general,
            from: 100
        }
    })
});

test('Should general range to be updated', () => {
    const state = reducer(defaultState, changeRangeTo(100, ConfigType.GENERAL));
    expect(state).toEqual({
        ...defaultState,
        general:{
            ...defaultState.general,
            to: 100
        }
    })
});