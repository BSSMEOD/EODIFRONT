import { Item, Place, Status } from '@/types/item/client';

export type GetItemDetailRes = Omit<Item, 'status'>;

export interface GetItemListParams {
  page?: number;
  size?: number;
  status?: Status;
  placeId?: string;
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

export type GetPlaceListRes = Place[];
