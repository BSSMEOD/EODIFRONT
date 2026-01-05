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

export const useImminentDisposalQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['disposal', 'imminent'],
    queryFn: () =>
      getDisposalItems({
        status: 'TO_BE_DISCARDED',
        page: 1,
        size: 100,
      }),
    select: (data) => {
      if (!data?.content) return [];
      const now = new Date();
      return data.content
        .filter((item) => {
          if (!item.disposalDate) return false;
          const disposalDate = new Date(item.disposalDate);
          const diffTime = disposalDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 3 && diffDays >= 0;
        })
        .slice(0, 3);
    },
    retry: false,
  });
  return { data: data || [], ...restQuery };
};
