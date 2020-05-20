import { h, Component, createContext } from 'preact';
import { useContext, useLayoutEffect, useEffect, useState } from 'preact/hooks';
import { forwardRef } from 'preact/compat';

const StoreContext = createContext();

export const Provider = StoreContext.Provider;

function resolveArgs (store, component) {
  if (arguments.length === 1) {
    component = store;
    // Disabling eslint on this line because optionally passing a store should be constant
    store = useContext(StoreContext); // eslint-disable-line react-hooks/rules-of-hooks
  }
  return [ store, component ];
}

export function Observer (...args) {
  const [ store, component ] = resolveArgs(...args);
  function Wrapper() {
    let unsubscribe;
    this.componentDidMount = () => {
      const subscriber = component.prototype.render ? (new component()).render : component;
      unsubscribe = store.subscribe(subscriber, () => this.setState({}));
    };
    this.componentWillUnmount = () => unsubscribe();
    this.render = (props) => h(component, { ...props, ...store.state, fire: store.fire });
  }
  (Wrapper.prototype = new Component()).constructor = Wrapper;
  return forwardRef((originProps, ref) => { // eslint-disable-line react/display-name
    return h(Wrapper, { ...originProps, ...store.state, fire: store.fire, ref });
  });
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useBase (...args) {
  let [ store, subscriber ] = resolveArgs(...args);
  const render = useState();
  if (typeof subscriber === 'string') subscriber = [ subscriber ];
  useIsomorphicLayoutEffect(() => store.subscribe(subscriber, () => render[1]({})), []);
  return [ store, subscriber ];
}

export function useUnifireState (...args) {
  const [ store, prop ] = useBase(...args);
  return [ store.state[prop], (val) => store.state[prop] = val ];
}

export function useUnifire (...args) {
  const [ store ] = useBase(...args);
  return [ store.state, store.fire ];
}
