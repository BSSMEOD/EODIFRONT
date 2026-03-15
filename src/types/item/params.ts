import { ItemForm, Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status?: Status[] | Status;
  categories?: string[] | string;
  placeIds?: number[];
  foundAtFrom?: string;
  foundAtTo?: string;
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  query?: string;
  sort?: 'LATEST' | 'OLDEST';
}

export interface PostItemClaimReq {
  visitDate: string;
}

interface ItemReq extends ItemForm {
  imageUrl: string;
}

export type PatchItemReq = ItemReq;

export type PostItemReq = ItemReq;
