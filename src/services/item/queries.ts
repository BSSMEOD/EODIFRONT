import { useQuery } from '@tanstack/react-query';
import { getItemDetail } from './apis';

export const useFindDetailQuery = (id: number) => {
  const { data, error, ...restQuery } = useQuery({
    queryKey: ['item', 'detail', id],
    queryFn: () => getItemDetail(id),
    enabled: !!id,
    retry: false,
  });
  return { data, error, ...restQuery };
};
