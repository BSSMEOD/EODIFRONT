import { eodi } from '@/api/instance/instance';
import type { GetLogListRes } from '@/types/log/response';
import type { GetLogListParams } from '@/types/log/params';

export const getLogList = async (params: GetLogListParams) => {
  const { data } = await eodi.get<GetLogListRes>('/items/search', {
    params: {
      page: params.page,
      size: params.size,
      status: params.status,
      place_id: params.placeId,
      found_at_from: params.foundAtFrom,
      found_at_to: params.foundAtTo,
      grade: params.grade,
      class: params.class,
      approved_at: params.approvedAt,
    },
  });
  return data;
};
