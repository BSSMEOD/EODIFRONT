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
export const useUnpaidRewardsQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['reward', 'unpaid'],
    queryFn: () => fetchRewardHistory({}),
    select: (data) => {
      if (!data?.histories) return [];
      return data.histories
        .filter((item) => !item.given_at)
        .slice(0, 3)
        .map((item) => ({
          id: item.item_id,
          name: item.item_name,
          imageUrl: '',
          reporterName: item.student_name,
          foundAt: item.received_at,
          foundPlace: '',
          foundPlaceDetail: '',
          status: 'FOUND' as const,
          category: '기타' as const,
        }));
    },
  });
  return { data: data || [], ...restQuery };
};
