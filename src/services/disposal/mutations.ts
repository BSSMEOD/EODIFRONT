import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitDisposalReason } from './apis';
import type { SubmitDisposalReasonReq } from './apis';

export const useSubmitDisposalReasonMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, ...restMutation } = useMutation({
    mutationFn: ({
      itemId,
      req,
    }: {
      itemId: number;
      req: SubmitDisposalReasonReq;
    }) => submitDisposalReason(itemId, req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposal', 'items'] });
    },
  });

  return { mutate, mutateAsync, ...restMutation };
};
