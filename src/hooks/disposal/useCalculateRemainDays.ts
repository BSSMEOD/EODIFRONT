import { useCallback } from 'react';
import { isValid } from 'date-fns';

const toDateOnly = (date: Date | string): Date | null => {
  try {
    const parsed = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(parsed)) return null;

    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  } catch {
    return null;
  }
};

export const useCalculateRemainDays = () => {
  const calculateRemainDays = useCallback(
    (foundAt: string, disposalDate?: string): number => {
      const foundDateOnly = toDateOnly(foundAt);
      if (!foundDateOnly) return 0; // 잘못된 foundAt이면 0 반환

      // today 관련 변수를 함수 최상단에서 한 번만 정의
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

      // disposalDate가 없거나 잘못되면 기존 로직 (foundAt + 180일)
      const diffTime = todayDateOnly.getTime() - foundDateOnly.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const remainDays = 180 - diffDays;

      return remainDays > 0 ? remainDays : 0;
    },
    []
  );

  return { calculateRemainDays };
};
