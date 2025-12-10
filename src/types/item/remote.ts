import { Item } from '@/types/item/client';

export type GetItemDetailRes = Omit<Item, 'status'>;

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: string;
  placeId?: number;
}

export interface GetItemListRes {
  content: Item[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export interface PostItemClaimReq {
  claimReason: string;
}
