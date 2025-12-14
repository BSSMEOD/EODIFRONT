import { eodi } from '@/api/instance/instance';
import type { GetItemListParams, GetItemListRes } from '@/types/item/remote';
import type { Item } from '@/types/item/client';

interface ApiItem {
  id: number;
  name: string;
  foundDate: string;
  status: string;
  foundPlace: string;
  placeDetail: string;
  imageUrl: string;
}

interface ApiResponse {
  content: ApiItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

const mapApiItemToItem = (apiItem: ApiItem): Item => ({
  id: apiItem.id,
  imageUrl: apiItem.imageUrl,
  name: apiItem.name,
  foundAt: apiItem.foundDate,
  foundPlace: apiItem.foundPlace,
  foundPlaceDetail: apiItem.placeDetail,
  status: apiItem.status as Item['status'],
});

export const getDisposalItems = async (
  params: GetItemListParams
): Promise<GetItemListRes> => {
  const response = await eodi.get<ApiResponse>('/items/search', {
    params: {
      page: params.page || 1,
      size: params.size || 10,
      status: params.status,
      place_id: params.placeId,
    },
  });

  return {
    content: response.data.content.map(mapApiItemToItem),
    page: response.data.page,
    size: response.data.size,
    totalElements: response.data.totalElements,
    totalPages: response.data.totalPages,
    isLast: response.data.isLast,
  };
};

export interface SubmitDisposalReasonRequest {
  reason: string;
  days: number;
}

export const submitDisposalReason = async (
  itemId: number,
  data: SubmitDisposalReasonRequest
): Promise<void> => {
  await eodi.post(`/items/${itemId}/disposal-reason`, data);
};
