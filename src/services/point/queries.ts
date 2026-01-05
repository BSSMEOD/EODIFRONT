import { useQuery } from '@tanstack/react-query';
import { fetchRewardHistory } from './apis';
import type { RewardHistoryParams } from '@/types/point/params';
import { eodi } from '@/api/instance/instance';
import type { GetItemListRes } from '@/types/item/response';

export const useRewardHistoryQuery = (params: RewardHistoryParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['reward', 'history', params],
    queryFn: () => fetchRewardHistory(params),
  });
  return { data, ...restQuery };
};

export const useUnpaidRewardsQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['items', 'found', 'unpaid'],
    queryFn: async () => {
      const { data } = await eodi.get<GetItemListRes>('/items/search', {
        params: {
          status: 'FOUND',
          page: 1,
          size: 3,
        },
      });
      return data;
    },
    select: (data) => {
      if (!data?.content) return [];
      return data.content;
    },
  });
  return { data: data || [], ...restQuery };
};
