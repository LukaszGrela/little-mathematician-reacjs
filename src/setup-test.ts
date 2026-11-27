import '@testing-library/jest-dom/vitest';
 
// import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';

// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({
//   adapter: new Adapter(),
// });

// expect.extend({
//   toMatchShapeOf,
//   toMatchOneOf,
// });

// import { mswServer } from './__tests/mswjs/node';
// import { signalREventsActive } from './__tests/mswjs/handlers/signalr';

// beforeEach(() => {
//   mswServer.listen();
//   mswServer.use(signalREventsActive);
// });
// afterEach(() => mswServer.resetHandlers());
// afterAll(() => mswServer.close());

import { beforeEach } from 'vitest';

// The store restores the saved history from localStorage, so every test starts
// with empty storage. A test that needs a saved payload writes it itself.
beforeEach(() => {
  try {
    window.localStorage.removeItem('little-mathematician:state');
  } catch {
    // storage unavailable - nothing to reset
  }
});
