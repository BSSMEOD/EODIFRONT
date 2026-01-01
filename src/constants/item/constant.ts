export const STATUS = {
  LOST: '보관중',
  FOUND: '지급 완료',
  TO_BE_DISCARDED: '폐기 예정',
  DISCARDED: '폐기 완료',
};

export const CATEGORY = [
  '교복',
  '사복',
  '체육복',
  '단체복',
  '안경',
  '무선이어폰',
  '전자기기',
  '기타',
] as const;

export const LOCATION_MAP: { [key: string]: number } = {
  본관: 1,
  창의관: 2,
  체육관: 3,
  별관: 4,
  '기숙사 A동': 5,
  '기숙사 B동': 6,
  SRC관: 7,
  기타: 8,
};
