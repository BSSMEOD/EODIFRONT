import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteItem,
  putItem,
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
import { toast } from 'react-toastify';

export const useItemClaimMutation = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (req: PostItemClaimReq) => postItemClaim(id, req),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['item', 'claim'] });
      toast.success(data.message || '회수 요청이 완료되었습니다.');
    },
    onError: (error: unknown) => {
      let errorMessage = '회수 요청 중 오류가 발생했습니다.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response: { data: { visitDate?: string; message?: string } };
        };
        const errorData = axiosError.response.data;
        errorMessage =
          errorData?.visitDate || errorData?.message || errorMessage;
      }

      toast.error(errorMessage);
    },
  });
  return { mutate, ...restMutation };
};

export const useItemDeleteMutation = (id: number) => {
  const { handleSuccess } = useApiHandler();
  const queryClient = useQueryClient();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: () => deleteItem(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['item'] });
      handleSuccess(data.message);
    },
  });
  return { mutate, ...restMutation };
};

export const useItemUpdateMutation = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleSuccess } = useApiHandler();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (form: PatchItemReq) => putItem(id, form),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['item'] });
      router.push(ROUTES.MANAGE);
      handleSuccess(data.message);
    },
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
