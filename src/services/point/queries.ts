import { useQuery } from '@tanstack/react-query';
import { fetchRewardRequestList } from './apis';
import { getItemList } from '@services/item/apis';

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
    queryFn: async () =>
      getItemList({
        status: 'GIVEN',
        page: 1,
        size: 3,
      }),
  });
  return { data, ...restQuery };
};
