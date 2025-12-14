import { LogItem } from './client';

export interface GetLogListParams {
  page?: number;
  size?: number;
  status?: string;
  place_id?: number;
}

export interface GetLogListRes {
  content: LogItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  last: boolean;
}
