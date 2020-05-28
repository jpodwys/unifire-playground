// import { Unifire } from '../unifire';
// import { Unifire } from '../unifire/set';
// import { Unifire } from '../unifire/batch';
import Unifire from '../unifire/debounce';
import { memoize } from '../unifire/memoize';
import { Todo, wait } from './utils';

// export const store = Unifire({
//   state: { count: 0 }
// });

const state = {
  count: parseInt(localStorage.getItem('count'), 10) || 0,
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  dub: ({ count }) => {
    console.log('dub');
    return count * 2;
  },
  quad: memoize(({ count }) => {
    console.log('quad');
    return count * 4;
  })
};

const actions = {
  increment: ({ state }) => state.count++,

  decrement: ({ state }) => state.count--,

  addTodo: ({ state }, name) => state.todos = [ ...state.todos, ...[ new Todo(name) ] ],

  removeTodo: ({ state }, id) => state.todos = state.todos.filter((item) => item.id !== id),

  toggleTodo: ({ state }, id) => {
    state.todos = state.todos.map((item) => {
      if (item.id === id) item.done = !item.done;
      return item;
    });
  },

  wait: async ({ state }) => {
    state.count++;
    await wait();
    state.count--;
  }
};

export const store = Unifire({ state, actions });

store.subscribe(({ count }) => localStorage.setItem('count', count));
store.subscribe(({ todos }) => localStorage.setItem('todos', JSON.stringify(todos)));
// store.listen((state, prior) => console.log(state, prior));
