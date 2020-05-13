import { h, Component, createContext } from 'preact';
import { useContext, useLayoutEffect, useEffect, useState } from 'preact/hooks';

const StoreContext = createContext();

export const Provider = StoreContext.Provider;

export function Observer (component) {
  function Wrapper() {
    const store = useContext(StoreContext);
    let unsubscribe;
    this.componentDidMount = () => {
      unsubscribe = store.subscribe(component, () => this.setState({}));
    };
    this.componentWillUnmount = () => unsubscribe();
    this.render = (props) => h(component, { ...props, ...store.state, fire: store.fire });
  }
  return (Wrapper.prototype = new Component()).constructor = Wrapper;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useUnifire (render) {
  const store = useContext(StoreContext);
  const state = useState({});

  useIsomorphicLayoutEffect(() => store.subscribe(render, () => state[1]({})), []);

  return render({ ...store.state, fire: store.fire });
}
