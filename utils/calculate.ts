//types
type calculateType = (first: number, second: number) => number;

export const add: calculateType = (first, second) => {
  return first + second;
};

export const subtract: calculateType = (first, second) => {
  return first - second;
};

export const multiply: calculateType = (first, second) => {
  return first * second;
};

export const divide: calculateType = (first, second) => {
  return first / second;
};
