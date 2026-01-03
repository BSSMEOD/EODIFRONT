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
}

export interface PostItemClaimReq {
  claimReason: string;
}

export interface PatchItemReq {
  name?: string;
  reporterStudentCode?: number;
  reporterName?: string;
  foundAt?: string;
  placeId?: number;
  placeDetail?: string;
  category?: string;
  imageUrl?: string;
}
