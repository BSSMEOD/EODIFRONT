import { useQuery } from '@tanstack/react-query';
import { getDisposalHistoryItems } from './apis';
import type { GetItemListParams } from '@/types/item/params';

export const useDisposalHistoryQuery = (params: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['disposal-history', 'items', params],
    queryFn: () => getDisposalHistoryItems(params),
    retry: false,
  });
  return { data, ...restQuery };
};
