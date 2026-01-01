import { Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: Status;
  category?: string;
  placeIds?: number[];
  placeId?: number; // Keeping for backward compatibility if needed
  foundAtFrom?: string;
  foundAtTo?: string;
  holdStatus?: '보류' | '예정';
}

export interface PostItemClaimReq {
  claimReason: string;
}
