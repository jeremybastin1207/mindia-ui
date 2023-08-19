export const bytes = (value = 1, from = 'mb', to = 'b') => {
  const bytes = {
    b: 1,
    kb: 2,
    mb: 3,
    gb: 4,
    tb: 5,
    pb: 6,
    eb: 7,
    zb: 8,
    yb: 9,
  };
  let a = bytes[from],
    b = bytes[to];
  if (a > b) for (let i = 0; i < a - b; i++) value *= 1024;
  else for (let i = 0; i < b - a; i++) value /= 1024;
  return value;
};
