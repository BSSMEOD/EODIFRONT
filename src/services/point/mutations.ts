import { useMutation } from '@tanstack/react-query';
import { postGiveReward } from './apis';
import type { GiveRewardRequest } from '@/types/point/params';

export const useGiveRewardMutation = () => {
  const { mutate, mutateAsync, ...restMutation } = useMutation({
    mutationFn: (data: GiveRewardRequest) => postGiveReward(data),
  });
  return { mutate, mutateAsync, ...restMutation };
};
