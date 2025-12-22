import { useQuery } from '@tanstack/react-query';
import { getIntroduce } from '@services/introduce/apis';

export const useIntroduceQuery = () => {
  const { data, ...restData } = useQuery({
    queryKey: ['introduce'],
    queryFn: () => getIntroduce(),
  });
  return { data, ...restData };
};
