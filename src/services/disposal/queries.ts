import { useQuery } from '@tanstack/react-query';
import { getDisposalItems } from './apis';
import type { GetItemListParams } from '@/types/item/params';

export const useDisposalItemsQuery = (params: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['disposal', 'items', params],
    queryFn: () => getDisposalItems(params),
    retry: false,
  });
  return { data, ...restQuery };
};

export const useDisposalItemsCountQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['disposal', 'items', 'count'],
    queryFn: () =>
      getDisposalItems({
        status: 'TO_BE_DISCARDED',
        page: 1,
        size: 1,
      }),
    select: (data) => data?.totalElements || 0,
    retry: false,
  });
  return { data: data || 0, ...restQuery };
};

export const useImminentDisposalQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['disposal', 'imminent'],
    queryFn: () =>
      getDisposalItems({
        status: 'TO_BE_DISCARDED',
        page: 1,
        size: 3,
      }),
    select: (data) => {
      if (!data?.content) return [];
      return data.content;
    },
    retry: false,
  });
  return { data: data || [], ...restQuery };
};
