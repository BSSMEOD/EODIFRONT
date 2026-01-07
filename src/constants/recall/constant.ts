export const RECALL_STATUS = {
  PENDING: '대기중',
  APPROVED: '승인됨',
  REJECTED: '반려됨',
} as const;

export const RECALL_STATUS_OPTIONS = [
  { label: '전체', value: '' },
  { label: '대기중', value: 'PENDING' },
  { label: '승인됨', value: 'APPROVED' },
  { label: '반려됨', value: 'REJECTED' },
] as const;
