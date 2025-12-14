import { eodi } from '@/api/instance/instance';
import type { GetItemListParams, GetItemListRes } from '@/types/item/remote';

export interface SubmitDisposalReasonReq {
  reason: string;
  days: number;
}

export const getDisposalItems = async (params: GetItemListParams) => {
  const { data } = await eodi.get<GetItemListRes>('/items/search', { params });
  return data;
};

export const submitDisposalReason = async (
  itemId: number,
  req: SubmitDisposalReasonReq
) => {
  const { data } = await eodi.post(`/items/${itemId}/disposal-reason`, req);
  return data;
};
