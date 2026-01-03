import { eodi } from '@/api/instance/instance';
import type { GetItemListRes } from '@/types/item/response';
import type { GetItemListParams } from '@/types/item/params';

export const getDisposalHistoryItems = async (params: GetItemListParams) => {
  const { data } = await eodi.get<GetItemListRes>('/items/search', {
    params: {
      ...params,
      status: 'DISCARDED', // 폐기 완료 상태로 고정
    },
  });
  return data;
};
