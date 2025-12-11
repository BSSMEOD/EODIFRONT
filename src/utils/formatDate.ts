import { format } from 'date-fns';

const toDate = (date: Date | string) =>
  typeof date === 'string' ? new Date(date) : date;

export const formatDateKor = (date: Date | string) => {
  const parsed = toDate(date);
  return format(parsed, 'yyyy년 MM월 dd일');
};

export const formatDateDot = (date: Date | string) => {
  const parsed = toDate(date);
  return format(parsed, 'yyyy.MM.dd');
};
