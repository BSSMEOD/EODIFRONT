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
