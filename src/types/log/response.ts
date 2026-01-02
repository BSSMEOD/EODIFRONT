import { LogItem } from './client';

export interface GetLogListRes {
  content: LogItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}
