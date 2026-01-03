import { useQuery } from '@tanstack/react-query';
import { getAdminDisposalItems } from './apis';
import type { GetItemListParams } from '@/types/item/params';

export const useAdminDisposalItemsQuery = (params: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['admin-disposal', 'items', params],
    queryFn: () => getAdminDisposalItems(params),
    retry: false,
  });
  return { data, ...restQuery };
};
