import { Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: Status;
  placeId?: number;
  foundAtFrom?: string;
  foundAtTo?: string;
  holdStatus?: '보류' | '예정';
}

export interface PostItemClaimReq {
  claimReason: string;
}
