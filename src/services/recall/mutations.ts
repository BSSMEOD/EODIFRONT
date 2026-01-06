import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveRecallRequest, rejectRecallRequest } from './apis';
import { ApproveRejectReq } from '@/types/recall/remote';
import { toast } from 'react-toastify';

export const useApproveRecallMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, req }: { itemId: number; req: ApproveRejectReq }) =>
      approveRecallRequest(itemId, req),
    onSuccess: (data) => {
      toast.success(data.message || '회수 요청이 승인되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['recall', 'requests'],
        exact: false,
      });
    },
  });
};

export const useRejectRecallMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, req }: { itemId: number; req: ApproveRejectReq }) =>
      rejectRecallRequest(itemId, req),
    onSuccess: (data) => {
      toast.success(data.message || '회수 요청이 반려되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['recall', 'requests'],
        exact: false,
      });
    },
  });
};
