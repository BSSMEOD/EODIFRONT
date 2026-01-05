import { Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: Status;
  categories?: string[];
  placeIds?: number[];
  foundAtFrom?: string;
  foundAtTo?: string;
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  query?: string;
  sort?: 'LATEST' | 'OLDEST';
}

export interface PostItemClaimReq {
  claimReason: string;
}
