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
