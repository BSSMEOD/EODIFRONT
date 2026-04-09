import { useQuery } from '@tanstack/react-query';
import { fetchRewardHistory, fetchRewardRequestList } from './apis';
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

export const useRewardRequestQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['reward', 'request'],
    queryFn: fetchRewardRequestList,
  });
  return { data, ...restQuery };
};

export const useUnpaidRewardsQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['items', 'found', 'unpaid'],
    queryFn: async () => {
      const { data } = await eodi.get<GetItemListRes>('/items/search', {
        params: {
          status: 'GIVEN',
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
