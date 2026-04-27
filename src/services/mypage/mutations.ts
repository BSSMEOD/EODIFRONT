import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { cancelMyClaim } from './apis';
import type { GetMyClaimsRes } from '@/types/mypage/remote';

export const useCancelMyClaimMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (claimId: number) => cancelMyClaim(claimId),
    onMutate: async (claimId) => {
      await queryClient.cancelQueries({ queryKey: ['mypage', 'claims'] });
      const previousClaimsQueries = queryClient.getQueriesData<GetMyClaimsRes>({
        queryKey: ['mypage', 'claims'],
      });

      previousClaimsQueries.forEach(([queryKey, old]) => {
        if (!old) return;

        queryClient.setQueryData<GetMyClaimsRes>(queryKey, {
          ...old,
          total: Math.max(0, old.total - 1),
          claims: old.claims.filter((claim) => claim.claimId !== claimId),
        });
      });

      return { previousClaimsQueries };
    },
    onSuccess: () => {
      toast.success('회수 요청이 취소되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['mypage', 'claims'] });
    },
    onError: (error, variables, context) => {
      context?.previousClaimsQueries?.forEach(([queryKey, old]) => {
        queryClient.setQueryData(queryKey, old);
      });

      const isAxiosError =
        error && typeof error === 'object' && 'response' in error;

      if (isAxiosError) {
        const message = (
          error as { response?: { data?: { message?: string } } }
        ).response?.data?.message;

        if (message) {
          toast.error(message);
          return;
        }
      }

      toast.error('회수 요청 취소 중 오류가 발생했습니다.');
    },
  });
};
