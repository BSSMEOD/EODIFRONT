import { eodi } from '@/api/instance/instance';
import {
  GetItemDetailRes,
  GetItemListParams,
  GetItemListRes,
  GetPlaceListRes,
  PostItemClaimReq,
} from '@/types/item/remote';
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

export const getPlaceList = async () => {
  const { data } = await eodi.get<GetPlaceListRes>('/places');
  return data;
};

export const deleteItem = async (id: number) => {
  const { data } = await eodi.delete(`/items/${id}`, authorization());
  return data;
};
