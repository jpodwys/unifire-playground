export function Todo (name) {
  return {
    id: Date.now(),
    name,
    done: false
  }
}

export const wait = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};