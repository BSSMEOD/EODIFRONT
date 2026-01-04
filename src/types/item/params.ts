import { Item, Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status?: Status;
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

interface ItemReq extends Omit<Item, 'id' | 'status' | 'foundPlace'> {
  placeId: string;
}

export type PatchItemReq = ItemReq;

export type PostItemReq = ItemReq;
