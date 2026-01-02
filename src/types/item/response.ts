import { Item } from './client';

export type GetItemDetailRes = Omit<Item, 'status'>;

export interface GetItemListRes {
  content: Item[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export interface GetClaimItemCountRes {
  count: number;
}

export interface GetClaimItemListRes {
  items: Item[];
}
