/* eslint-disable */
import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

expect.extend({
  toMatchShapeOf,
  toMatchOneOf,
});
