import { useQuery } from '@tanstack/react-query';
import { getLogList } from './apis';
import type { GetLogListParams } from '@/types/log/remote';

export const useLogListQuery = (params: GetLogListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['log', 'list', params],
    queryFn: () => getLogList(params),
    retry: false,
  });
  return { data, ...restQuery };
};
