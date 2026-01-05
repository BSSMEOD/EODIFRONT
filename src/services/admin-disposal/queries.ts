import { useQuery } from '@tanstack/react-query';
import { getAdminDisposalItems } from './apis';
import type { GetItemListParams } from '@/types/item/params';

export const useAdminDisposalItemsQuery = (params: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['admin-disposal', 'items', params],
    queryFn: () => getAdminDisposalItems(params),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  return { data, ...restQuery };
};
