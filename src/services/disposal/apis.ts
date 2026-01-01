import { eodi } from '@/api/instance/instance';
import type { GetItemListRes } from '@/types/item/response';
import type { GetItemListParams } from '@/types/item/params';

export interface SubmitDisposalReasonReq {
  reason: string;
  days: number;
}
export const getDisposalItems = async (params: GetItemListParams) => {
  const { data } = await eodi.get<GetItemListRes>('/items/search', {
    params: {
      page: params.page,
      size: params.size,
      status: params.status,
      place_id: params.placeId,
      found_at_from: params.foundAtFrom,
      found_at_to: params.foundAtTo,
      hold_status: params.holdStatus,
    },
  });
  return data;
};

export const submitDisposalReason = async (
  itemId: number,
  req: SubmitDisposalReasonReq
) => {
  const { data } = await eodi.post(`/items/${itemId}/disposal-reason`, req);
  return data;
};
