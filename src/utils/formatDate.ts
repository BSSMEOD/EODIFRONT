import dayjs, { Dayjs } from 'dayjs';

const toDayjs = (date: Dayjs | string) =>
  typeof date === 'string' ? dayjs(date) : date;

export const formatDateKor = (date: Dayjs | string) => {
  const dayjsDate = toDayjs(date);
  return dayjsDate.format('YYYY년 MM월 DD일');
};

export const formatDateDot = (date: Dayjs | string) => {
  const dayjsDate = toDayjs(date);
  return dayjsDate.format('YYYY.MM.DD');
};
