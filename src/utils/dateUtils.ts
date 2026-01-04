import { isValid } from 'date-fns';

export const toDateOnly = (date: Date | string): Date | null => {
  try {
    const parsed = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(parsed)) return null;

    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  } catch {
    return null;
  }
};

export const isDateInRange = (
  targetDate: string | null | undefined,
  startDate: Date,
  endDate: Date
): boolean => {
  if (!targetDate) return false;

  const targetDateOnly = toDateOnly(targetDate);
  const startDateOnly = toDateOnly(startDate);
  const endDateOnly = toDateOnly(endDate);

  if (!targetDateOnly || !startDateOnly || !endDateOnly) return false;

  return targetDateOnly >= startDateOnly && targetDateOnly <= endDateOnly;
};
