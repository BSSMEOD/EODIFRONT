import { Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: Status;
  categories?: string[];
  placeIds?: number[];
  placeId?: number;
  foundAtFrom?: string;
  foundAtTo?: string;
  holdStatus?: '보류' | '예정';
  query?: string;
}

export interface PostItemClaimReq {
  claimReason: string;
}
