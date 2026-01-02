import { useQuery } from '@tanstack/react-query';
import { fetchRewardHistory } from './apis';
import type { RewardHistoryParams } from '@/types/point/params';

export const useRewardHistoryQuery = (params: RewardHistoryParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['reward', 'history', params],
    queryFn: () => fetchRewardHistory(params),
  });
  return { data, ...restQuery };
};
