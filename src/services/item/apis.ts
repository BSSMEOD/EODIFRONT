import { eodi } from '@/api/instance/instance';
import type { GetItemDetailRes, GetItemListRes } from '@/types/item/response';
import type { GetItemListParams, PostItemClaimReq } from '@/types/item/params';
import authorization from '@/api/token/token';

export const getItemDetail = async (id: number) => {
  const { data } = await eodi.get<GetItemDetailRes>(`/items/${id}`);
  return data;
};
export const getItemList = async (params?: GetItemListParams) => {
  const { data } = await eodi.get<GetItemListRes>('/items/search', { params });
  return data;
};

export const postItemClaim = async (id: number, req: PostItemClaimReq) => {
  const { data } = await eodi.post(`/items/${id}/claim`, req, authorization());
  return data;
};
