import { useCallback } from 'react';

export const useCalculateRemainDays = () => {
  const calculateRemainDays = useCallback((foundAt: string): number => {
    const found = new Date(foundAt);
    const today = new Date();
    const diffTime = today.getTime() - found.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const remainDays = 180 - diffDays;
    return remainDays > 0 ? remainDays : 0;
  }, []);

  return { calculateRemainDays };
};
