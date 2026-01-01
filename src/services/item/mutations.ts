import { useMutation } from '@tanstack/react-query';
import { postItemClaim } from './apis';
import { PostItemClaimReq } from '@/types/item/params';

export const useItemClaimMutation = (id: number) => {
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (req: PostItemClaimReq) => postItemClaim(id, req),
  });
  return { mutate, ...restMutation };
};
