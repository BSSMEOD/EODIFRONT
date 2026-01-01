import { useQuery } from '@tanstack/react-query';
import { getItemDetail, getItemList } from './apis';
import type { GetItemListParams } from '@/types/item/params';
import { getPlaceList } from './apis';

export const useFindDetailQuery = (id: number) => {
  const { data, error, ...restQuery } = useQuery({
    queryKey: ['item', 'detail', id],
    queryFn: () => getItemDetail(id),
    enabled: !!id,
    retry: false,
  });
  return { data, error, ...restQuery };
};

export const useItemListQuery = (params: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['item', 'list', params],
    queryFn: () => getItemList(params),
  });
  return { data, ...restQuery };
};

export const usePlaceListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['place', 'list'],
    queryFn: () => getPlaceList(),
  });
  return { data, ...restQuery };
};
