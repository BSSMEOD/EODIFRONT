import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteItem,
  patchItem,
  postItem,
  postItemClaim,
} from '@services/item/apis';
import {
  PatchItemReq,
  PostItemClaimReq,
  PostItemReq,
} from '@/types/item/params';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import { useApiHandler } from '@hooks/useApiHandler';

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

export const useItemRegisterMutation = () => {
  const { handleSuccess } = useApiHandler();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (form: PostItemReq) => postItem(form),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['item'] });
      router.push(ROUTES.FIND);
      handleSuccess(data.message);
    },
  });
  return { mutate, ...restMutation };
};
