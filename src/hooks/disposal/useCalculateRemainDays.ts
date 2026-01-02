import { useCallback } from 'react';

export const useCalculateRemainDays = () => {
  const calculateRemainDays = useCallback((foundAt: string): number => {
    const found = new Date(foundAt);
    const foundDateOnly = new Date(
      found.getFullYear(),
      found.getMonth(),
      found.getDate()
    );
    const today = new Date();
    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diffTime = todayDateOnly.getTime() - foundDateOnly.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const remainDays = 180 - diffDays;

    return remainDays > 0 ? remainDays : 0;
  }, []);

  return { calculateRemainDays };
};
