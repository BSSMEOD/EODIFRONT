import { format, isValid } from 'date-fns';

const toDate = (date: Date | string): Date => {
  const parsed = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(parsed)) {
    throw new Error(`유효하지 않은 날짜입니다: ${date}`);
  }

  return parsed;
};

export const formatDateKor = (date: Date | string) => {
  const parsed = toDate(date);
  return format(parsed, 'yyyy년 MM월 dd일');
};

export const formatDateDot = (date: Date | string) => {
  const parsed = toDate(date);
  return format(parsed, 'yyyy.MM.dd');
};

export const formatRangeDateDot = (
  startDate: Date | string,
  endDate: Date | string | null
) => {
  if (!endDate) return formatDateDot(startDate);
  return `${formatDateDot(startDate)} ~ ${formatDateDot(endDate)}`;
};

export const formatDateDash = (
  date: Date | string,
  inputType: 'year' | 'month' | 'date' = 'date'
) => {
  const parsed = toDate(date);
  const formatStr =
    inputType === 'year'
      ? 'yyyy'
      : inputType === 'month'
        ? 'yyyy-MM'
        : 'yyyy-MM-dd';
  return format(parsed, formatStr);
};
