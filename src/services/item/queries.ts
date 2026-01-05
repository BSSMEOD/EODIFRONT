import { useQuery } from '@tanstack/react-query';
import {
  getClaimItemCount,
  getClaimItemList,
  getItemDetail,
  getItemList,
} from './apis';
import type { GetItemListParams } from '@/types/item/params';
import { getPlaceList } from './apis';
import { useAuthStore } from '@/stores/useAuthStore';

export const useFindDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['item', 'detail', id],
    queryFn: () => getItemDetail(id),
    enabled: !!id,
    retry: false,
  });
  return { data, ...restQuery };
};

export const useItemListQuery = (params?: GetItemListParams) => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['item', 'list', params],
    queryFn: () => getItemList(params),
  });
  return { data, ...restQuery };
};

export const useClaimItemListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: ['item', 'claim'],
    queryFn: () => getClaimItemList(),
    retry: false,
    enabled: false,
  });
  return { data, ...restQuery };
};

export const useClaimItemCountQuery = () => {
  const { authority } = useAuthStore();
  const isAdmin = authority === 'ADMIN';

  const { data, ...restQuery } = useQuery({
    queryKey: ['item', 'claim', 'count'],
    queryFn: () => getClaimItemCount(),
    retry: false,
    enabled: isAdmin,
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
