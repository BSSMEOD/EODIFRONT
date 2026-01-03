import { useCallback } from 'react';

export const useCalculateRemainDays = () => {
  const calculateRemainDays = useCallback(
    (foundAt: string, disposalDate?: string): number => {
      // disposalDate가 있으면 해당 날짜까지의 남은 일수 계산 (연장된 경우)
      if (disposalDate) {
        const disposal = new Date(disposalDate);
        const disposalDateOnly = new Date(
          disposal.getFullYear(),
          disposal.getMonth(),
          disposal.getDate()
        );
        const today = new Date();
        const todayDateOnly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );

        const diffTime = disposalDateOnly.getTime() - todayDateOnly.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
      }

      // disposalDate가 없으면 기존 로직 (foundAt + 180일)
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
    },
    []
  );

  return { calculateRemainDays };
};
