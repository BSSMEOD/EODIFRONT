import { Item, Place } from './client';

export type GetItemDetailRes = Omit<Item, 'status'>;

export interface GetItemListRes {
  content: Item[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export type GetPlaceListRes = Place[];
