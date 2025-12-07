export const addPX = (dist: string | number) =>
  typeof dist === 'number' ? `${dist}px` : dist;
