import { eodi } from '@/api/instance/instance';
import type { GetLogListParams, GetLogListRes } from '@/types/log/remote';

export const getLogList = async (params: GetLogListParams) => {
  const { data } = await eodi.get<GetLogListRes>('/items/search', { params });
  return data;
};
