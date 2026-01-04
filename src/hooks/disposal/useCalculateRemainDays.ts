import { useCallback } from 'react';
import { toDateOnly } from '@/utils/dateUtils';

export const useCalculateRemainDays = () => {
  const calculateRemainDays = useCallback(
    (foundAt: string, disposalDate?: string): number => {
      const foundDateOnly = toDateOnly(foundAt);
      if (!foundDateOnly) return 0;

      const today = new Date();
      const todayDateOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      if (disposalDate) {
        const disposalDateOnly = toDateOnly(disposalDate);
        if (disposalDateOnly) {
          const diffTime = disposalDateOnly.getTime() - todayDateOnly.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          return diffDays > 0 ? diffDays : 0;
        }
      }

      const diffTime = todayDateOnly.getTime() - foundDateOnly.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const remainDays = 180 - diffDays;

      return remainDays > 0 ? remainDays : 0;
    },
    []
  );

  return { calculateRemainDays };
};
