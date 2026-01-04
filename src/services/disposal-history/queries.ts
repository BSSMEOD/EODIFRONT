import { useQuery } from '@tanstack/react-query';
import { getDisposalHistoryItems } from './apis';
import type { GetItemListParams } from '@/types/item/params';

export const useDisposalHistoryQuery = (params: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['disposal-history', 'items', params],
    queryFn: () => getDisposalHistoryItems(params),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  return { data, ...restQuery };
};
