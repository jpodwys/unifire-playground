// import { Unifire } from '../unifire';
import { Unifire } from '../unifire/batch';

const wait = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const state = {
  one: 1,
  two: 2,
  count: parseInt(localStorage.getItem('count'), 10) || 0,
  list: [ 'one', 'two', 'three', 'four' ]
};

const actions = {
  increment: ({ state }) => state.count++,
  incrementTwice: ({ state }) => {
    state.count++;
    state.count++;
  },
  decrement: ({ state }) => state.count--,
  changeBoth: ({ state }) => {
    state.one++;
    state.two++;
  },
  changeBothAsync: async ({ state }) => {
    state.count++;
    state.one++;
    await Promise.resolve();
    state.count++;
  },
  wait: async ({ state }) => {
    state.count++;
    await wait();
    state.count--;
  }
};

export const store = Unifire({ state, actions });

store.subscribe(({ count }, { prior }) => {
  localStorage.setItem('count', count);
  console.log('COUNT', count, prior);
});
