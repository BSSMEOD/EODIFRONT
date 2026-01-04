import { Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: Status;
  categories?: string[];
  placeIds?: number[];
  foundAtFrom?: string;
  foundAtTo?: string;
  holdStatus?: '보류' | '예정';
  query?: string;
  sort?: 'LATEST' | 'OLDEST';
}

export interface PostItemClaimReq {
  claimReason: string;
}
