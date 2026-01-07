import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveRecallRequest, rejectRecallRequest } from './apis';
import { toast } from 'react-toastify';
import type { RecallRequest } from '@/types/recall/client';
import type { GetRecallRequestsRes } from '@/types/recall/remote';

const updateRecallStatusOptimistic = (
  queryClient: ReturnType<typeof useQueryClient>,
  claimId: number,
  newStatus: 'APPROVED' | 'REJECTED'
) => {
  queryClient.setQueriesData(
    { queryKey: ['recall', 'requests'] },
    (old: GetRecallRequestsRes | undefined) => {
      if (!old) return old;
      return {
        ...old,
        requests: old.requests.map((req) =>
          req.requestId === claimId ? { ...req, status: newStatus } : req
        ),
      };
    }
  );
};

const handleRecallMutationError = (
  error: unknown,
  context: { previousData: unknown } | undefined,
  queryClient: ReturnType<typeof useQueryClient>,
  actionType: '승인' | '반려'
) => {
  if (context?.previousData) {
    queryClient.setQueryData(['recall', 'requests'], context.previousData);
  }

  const isAxiosError =
    error && typeof error === 'object' && 'response' in error;
  if (
    isAxiosError &&
    (error as { response?: { status?: number } }).response?.status === 400
  ) {
    queryClient.invalidateQueries({ queryKey: ['recall', 'requests'] });
    toast.info('이미 처리된 요청입니다.');
  } else {
    toast.error(`${actionType} 처리 중 오류가 발생했습니다.`);
  }
};

export const useApproveRecallMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (claimId: number) => approveRecallRequest(claimId),
    onMutate: async (claimId) => {
      await queryClient.cancelQueries({ queryKey: ['recall', 'requests'] });
      const previousData = queryClient.getQueryData(['recall', 'requests']);
      updateRecallStatusOptimistic(queryClient, claimId, 'APPROVED');
      return { previousData };
    },
    onSuccess: () => {
      toast.success('회수 요청이 승인되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['recall', 'requests'] });
    },
    onError: (error, variables, context) => {
      handleRecallMutationError(error, context, queryClient, '승인');
    },
  });
};

export const useRejectRecallMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (claimId: number) => rejectRecallRequest(claimId),
    onMutate: async (claimId) => {
      await queryClient.cancelQueries({ queryKey: ['recall', 'requests'] });
      const previousData = queryClient.getQueryData(['recall', 'requests']);
      updateRecallStatusOptimistic(queryClient, claimId, 'REJECTED');
      return { previousData };
    },
    onSuccess: () => {
      toast.success('회수 요청이 반려되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['recall', 'requests'] });
    },
    onError: (error, variables, context) => {
      handleRecallMutationError(error, context, queryClient, '반려');
    },
  });
};
