export default function Unifire (config) {
  const SUBSCRIPTIONS = {};
  const ACTIONS = {};
  const BARE_STATE = {};
  let DEPS = new Set();
  let PENDING_DELTA = {};
  let prior;

  const STATE = new Proxy(BARE_STATE, {
    get (state, prop) {
      return isFunc(state[prop]) ? state[prop](STATE) : state[prop]
    },
    set (state, prop, next) {
      if (!isFunc(state[prop]) && state[prop] !== next) {
        state[prop] = PENDING_DELTA[prop] = next;
        callUniqueSubscribers();
      }
      return true;
    }
  });

  const isFunc = (val) => val instanceof Function;

  const deref = (obj, target = {}) => Object.assign(target, obj);

  const subscribe = (cb, override) => {
    if (Array.isArray(cb)) {
      DEPS = new Set(cb);
    } else {
      DEPS.clear();
      cb(new Proxy({}, {
        get (_, prop) {
          DEPS.add(prop);
          return STATE[prop];
        }
      }), {});
    }
    DEPS.forEach((dep) => SUBSCRIPTIONS[dep] && SUBSCRIPTIONS[dep].add(override || cb));
    return () => DEPS.forEach((dep) => SUBSCRIPTIONS[dep] && SUBSCRIPTIONS[dep].delete(override || cb));
  }

  const debounce = (func) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func);
    };
  }

  const callUniqueSubscribers = debounce(() => {
    const uniqueSubscribers = new Set();
    for (const prop in PENDING_DELTA) {
      SUBSCRIPTIONS[prop] && SUBSCRIPTIONS[prop].forEach((sub) => uniqueSubscribers.add(sub));
    }
    uniqueSubscribers.forEach((sub) => sub(STATE, prior));
    PENDING_DELTA = {};
    prior = deref(STATE);
  })

  const fire = async (actionName, payload) => {
    return ACTIONS[actionName] && ACTIONS[actionName]({ state: STATE, fire }, payload);
  }

  const register = ({ state = {}, actions = {} }) => {
    for (const prop in state) SUBSCRIPTIONS[prop] = new Set();
    deref(actions, ACTIONS);
    deref(state, STATE);
    for (const prop in state) {
      if (isFunc(state[prop])) {
        subscribe(state[prop], () => SUBSCRIPTIONS[prop].forEach((sub) => sub(STATE)));
      }
    }
    prior = deref(STATE);
  }

  register(config);

  return { state: STATE, fire, subscribe, register };
}
