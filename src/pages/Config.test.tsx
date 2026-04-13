import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Config } from "./Config";
import {
  changeNumberOfQuestions,
  changeRangeFrom,
  changeRangeTo,
  ConfigType,
} from "../actions/actions";
import { storeDecorator } from "../__tests/storeDecorator";
import type { TConfigState } from "../reducers/configReducer";
import { setupStore } from "../store/Store";

const configModified: TConfigState = {
  general: {
    questionCount: 25,
    from: 20,
    to: 30,
  },
};

const config: TConfigState = {
  general: {
    questionCount: 10,
    from: 0,
    to: 10,
  },
};

test("Should render Config correctly", () => {
  const { container } = storeDecorator(<Config />);
  expect(container).toMatchSnapshot();
});

test("Should render Config correctly with modified data", async () => {
  const store = setupStore();

  store.dispatch(
    changeNumberOfQuestions(
      configModified.general.questionCount,
      ConfigType.GENERAL,
    ),
  );
  store.dispatch(
    changeRangeFrom(configModified.general.from, ConfigType.GENERAL),
  );
  store.dispatch(changeRangeTo(configModified.general.to, ConfigType.GENERAL));

  const { container } = await act(async () =>
    Promise.resolve(storeDecorator(<Config />, undefined, store)),
  );

  expect(container).toMatchSnapshot();
});

test("Should changeNumberOfQuestions for general conf be called", async () => {
  const user = userEvent.setup();
  const store = setupStore();

  const { getByTestId } = await act(async () =>
    Promise.resolve(storeDecorator(<Config />, undefined, store)),
  );

  expect(store.getState().config.general.questionCount).toBe(
    config.general.questionCount,
  );

  const select = getByTestId("general-questions");
  expect(select).toBeInTheDocument();

  await act(() => {
    return user.selectOptions(
      select,
      configModified.general.questionCount.toString(),
    );
  });

  expect(store.getState().config.general.questionCount).toBe(
    configModified.general.questionCount,
  );
});

test('Should changeRangeFrom for general conf be called, "changeRangeTo" be updated', async () => {
  const user = userEvent.setup();
  const store = setupStore();

  const { getByTestId } = await act(async () =>
    Promise.resolve(storeDecorator(<Config />, undefined, store)),
  );

  expect(store.getState().config.general.from).toBe(config.general.from);

  const select = getByTestId("general-range-from");
  expect(select).toBeInTheDocument();

  await act(() => {
    return user.selectOptions(select, configModified.general.from.toString());
  });

  //
  expect(store.getState().config.general.from).toBe(
    configModified.general.from,
  );
  // because new value is bigger than the to value,
  // the 'to' value needs to change too to be 10 more
  expect(store.getState().config.general.to).toBe(
    configModified.general.from + 10,
  );
});

test('Should changeRangeFrom for general conf be called, "changeRangeTo" not called', async () => {
  const user = userEvent.setup();
  const store = setupStore();
  store.dispatch(
    changeNumberOfQuestions(
      configModified.general.questionCount,
      ConfigType.GENERAL,
    ),
  );

  store.dispatch(
    changeRangeFrom(configModified.general.from, ConfigType.GENERAL),
  );
  store.dispatch(changeRangeTo(configModified.general.to, ConfigType.GENERAL));

  const { getByTestId } = await act(async () =>
    Promise.resolve(storeDecorator(<Config />, undefined, store)),
  );

  expect(store.getState().config.general.from).toBe(
    configModified.general.from,
  );

  const select = getByTestId("general-range-from");
  expect(select).toBeInTheDocument();

  await act(() => {
    return user.selectOptions(select, config.general.from.toString());
  });

  //
  expect(store.getState().config.general.from).toBe(config.general.from);
  // because new value is NOT bigger than the to value,
  // the 'to' value needs NOT change
  expect(store.getState().config.general.to).toBe(configModified.general.to);
});

test('Should changeRangeTo for general conf be called, "changeRangeFrom" not called', async () => {
  const user = userEvent.setup();
  const store = setupStore();

  const { getByTestId } = await act(async () =>
    Promise.resolve(storeDecorator(<Config />, undefined, store)),
  );

  expect(store.getState().config.general.to).toBe(config.general.to);

  const select = getByTestId("general-range-to");
  expect(select).toBeInTheDocument();

  await act(() => {
    return user.selectOptions(select, configModified.general.to.toString());
  });

  //
  expect(store.getState().config.general.to).toBe(configModified.general.to);
  // because new value is NOT bigger than the to value,
  // the 'to' value needs NOT change
  expect(store.getState().config.general.from).toBe(config.general.from);
});

test('Should changeRangeTo for general conf be called, "changeRangeFrom" be updated', async () => {
  const user = userEvent.setup();
  const store = setupStore();

  store.dispatch(
    changeRangeFrom(configModified.general.to, ConfigType.GENERAL),
  );

  const { getByTestId } = await act(async () =>
    Promise.resolve(storeDecorator(<Config />, undefined, store)),
  );

  expect(store.getState().config.general.from).toBe(configModified.general.to);

  const select = getByTestId("general-range-to");
  expect(select).toBeInTheDocument();

  await act(() => {
    return user.selectOptions(select, configModified.general.to.toString());
  });

  //
  expect(store.getState().config.general.from).toBe(
    configModified.general.from,
  );
  // because new value is bigger than the to value,
  // the 'to' value needs to change too to be 10 more
  expect(store.getState().config.general.from).toBe(
    configModified.general.to - 10,
  );
});
