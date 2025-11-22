export const addPX = (dist: string | number | undefined) =>
  typeof dist === 'number' ? `${dist}px` : dist;
