import { Category, ItemForm, Status } from './client';

export interface GetItemListParams {
  page?: number;
  size?: number;
  status?: Status[] | Status;
  categories?: Category;
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

interface ItemReq extends ItemForm {
  imageUrl: string;
}

export type PatchItemReq = ItemReq;

export type PostItemReq = ItemReq;
