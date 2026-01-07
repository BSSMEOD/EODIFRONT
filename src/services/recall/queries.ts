import { useQuery } from '@tanstack/react-query';
import { getRecallRequests } from './apis';
import { GetRecallRequestsParams } from '@/types/recall/remote';

export const useRecallRequestsQuery = (params?: GetRecallRequestsParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['recall', 'requests', params],
    queryFn: () => getRecallRequests(params),
    retry: 3,
  });

  return { data, ...restQuery };
};
