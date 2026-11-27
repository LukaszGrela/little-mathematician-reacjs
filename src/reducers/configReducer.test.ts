import { expect, test } from "vitest";
import reducer, { type TConfigState } from "./configReducer";
import {
  changeNumberOfQuestions,
  changeRangeFrom,
  changeRangeTo,
  ConfigType,
} from "../actions/actions";

const defaultState: TConfigState = {
  general: {
    questionCount: 10,
    from: 0,
    to: 10,
  },
};

test("Should configReducer set default state", () => {
  const state = reducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(defaultState);
});

test("Should the settings NOT be changed for invalid action", () => {
  let state = reducer(defaultState, { type: "dummy" as never });
  expect(state).toEqual(defaultState);
  state = reducer(
    defaultState,
    changeNumberOfQuestions(100, "unknown" as never),
  );
  expect(state).toEqual(defaultState);
});

test("Should general questionCount be updated", () => {
  const state = reducer(
    defaultState,
    changeNumberOfQuestions(100, ConfigType.GENERAL),
  );
  expect(state).toEqual({
    ...defaultState,
    general: {
      ...defaultState.general,
      questionCount: 100,
    },
  });
});

test("Should general range from be updated", () => {
  const state = reducer(defaultState, changeRangeFrom(100, ConfigType.GENERAL));
  expect(state).toEqual({
    ...defaultState,
    general: {
      ...defaultState.general,
      from: 100,
    },
  });
});

test("Should general range to be updated", () => {
  const state = reducer(defaultState, changeRangeTo(100, ConfigType.GENERAL));
  expect(state).toEqual({
    ...defaultState,
    general: {
      ...defaultState.general,
      to: 100,
    },
  });
});

test.each([
  [0, 1],
  [-5, 1],
  [Number.NaN, 1],
  [7.9, 7],
])("Should clamp questionCount %s to %s", (requested: number, expected: number) => {
  const state = reducer(
    defaultState,
    changeNumberOfQuestions(requested, ConfigType.GENERAL),
  );
  expect(state.general.questionCount).toBe(expected);
});

test.each([
  [Number.NaN, 0],
  [-5, 0],
  [7.9, 7],
  [Number.POSITIVE_INFINITY, 0],
])("Should normalize range from %s to %s", (requested: number, expected: number) => {
  const state = reducer(
    defaultState,
    changeRangeFrom(requested, ConfigType.GENERAL),
  );
  expect(state.general.from).toBe(expected);
  expect(state.general.to).toBe(defaultState.general.to);
});

test.each([
  [Number.NaN, 10],
  [-3, 0],
  [12.9, 12],
  [Number.NEGATIVE_INFINITY, 10],
])("Should normalize range to %s to %s", (requested: number, expected: number) => {
  const state = reducer(
    defaultState,
    changeRangeTo(requested, ConfigType.GENERAL),
  );
  expect(state.general.to).toBe(expected);
  expect(state.general.from).toBe(defaultState.general.from);
});

test("Should keep the stored range bound for a non numeric value", () => {
  let state = reducer(
    defaultState,
    changeRangeFrom("abc" as never, ConfigType.GENERAL),
  );
  expect(state.general).toEqual(defaultState.general);
  state = reducer(
    defaultState,
    changeRangeTo("abc" as never, ConfigType.GENERAL),
  );
  expect(state.general).toEqual(defaultState.general);
});

test("Should not mutate the previous state on range change", () => {
  const state = reducer(defaultState, changeRangeFrom(40, ConfigType.GENERAL));
  expect(defaultState.general.from).toBe(0);
  expect(state).not.toBe(defaultState);
  expect(state.general).not.toBe(defaultState.general);
});
