import { eodi } from '@/api/instance/instance';
import {
  GetClaimItemCountRes,
  GetClaimItemListRes,
  GetItemDetailRes,
  GetItemListParams,
  GetItemListRes,
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

export const getClaimItemList = async () => {
  const { data } = await eodi.get<GetClaimItemListRes>(
    `/items/claims`,
    authorization()
  );
  return data;
};

export const getClaimItemCount = async () => {
  const { data } = await eodi.get<GetClaimItemCountRes>(
    `/items/claims/count`,
    authorization()
  );
  return data;
};

export const postItemClaim = async (id: number, req: PostItemClaimReq) => {
  const { data } = await eodi.post(`/items/${id}/claims`, req, authorization());
  return data;
};
