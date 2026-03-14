import { format, isValid } from 'date-fns';

const toDate = (date: Date | string): Date => {
  const parsed = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(parsed)) {
    throw new Error(`유효하지 않은 날짜입니다: ${date}`);
  }

  return parsed;
};

export const getStringFormat = (date: string | Date) => {
  if (date instanceof Date || date.length >= 10) return 'date';
  if (date.length >= 7) return 'month';
  if (date.length >= 4) return 'year';
  throw new Error(`유효하지 않은 날짜 문자열입니다: ${date}`);
};

export const formatDateKor = (
  date: Date | string,
  inputType?: 'year' | 'month' | 'date'
) => {
  const parsed = toDate(date);
  const stringFormat = inputType || getStringFormat(date);
  const formatStr = {
    year: 'yyyy년',
    month: 'yyyy년 MM월',
    date: 'yyyy년 MM월 dd일',
  };
  return format(parsed, formatStr[stringFormat]);
};

export const formatDateDot = (
  date: Date | string,
  inputType?: 'year' | 'month' | 'date'
) => {
  const parsed = toDate(date);
  const stringFormat = inputType || getStringFormat(date);
  const formatStr = {
    year: 'yyyy',
    month: 'yyyy.MM',
    date: 'yyyy.MM.dd',
  };
  return format(parsed, formatStr[stringFormat]);
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
  inputType?: 'year' | 'month' | 'date'
) => {
  const parsed = toDate(date);
  const stringFormat = inputType || getStringFormat(date);
  const formatStr = {
    year: 'yyyy',
    month: 'yyyy-MM',
    date: 'yyyy-MM-dd',
  };
  return format(parsed, formatStr[stringFormat]);
};
