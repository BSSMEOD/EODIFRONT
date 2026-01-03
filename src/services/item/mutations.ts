import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem, patchItem, postItemClaim } from '@services/item/apis';
import { PatchItemReq, PostItemClaimReq } from '@/types/item/params';

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['item'] }),
  });
  return { mutate, ...restMutation };
};

export const useItemUpdateMutation = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (form: PatchItemReq) => patchItem(id, form),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['item'] }),
  });
  return { mutate, ...restMutation };
};
