import { eodi } from '@/api/instance/instance';
import type {
  GetItemDetailRes,
  GetItemListParams,
  GetItemListRes,
} from '@/types/item/remote';

export const getItemDetail = async (id: number) => {
  const { data } = await eodi.get<GetItemDetailRes>(`/items/${id}`);
  return data;
};

export const getItemList = async (params?: GetItemListParams) => {
  const { data } = await eodi.get<GetItemListRes>('/items/search', { params });
  return data;
};
