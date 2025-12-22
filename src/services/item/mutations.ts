import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem, postItemClaim } from '@services/item/apis';
import { PostItemClaimReq } from '@/types/item/remote';

export const useItemClaimMutation = (id: number) => {
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (req: PostItemClaimReq) => postItemClaim(id, req),
  });
  return { mutate, ...restMutation };
};

export const useItemDeleteMutation = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: () => deleteItem(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['item', 'list'] }),
  });
  return { mutate, ...restMutation };
};
