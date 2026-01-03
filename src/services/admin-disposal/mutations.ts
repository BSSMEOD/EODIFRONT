import { useMutation } from '@tanstack/react-query';
import {
  postDisposalReason,
  patchItemDiscarded,
  PostDisposalReasonReq,
  PatchItemDiscardedReq,
} from './apis';

export const usePostDisposalReasonMutation = () => {
  return useMutation({
    mutationFn: ({
      itemId,
      req,
    }: {
      itemId: number;
      req: PostDisposalReasonReq;
    }) => postDisposalReason(itemId, req),
  });
};

export const usePatchItemDiscardedMutation = () => {
  return useMutation({
    mutationFn: ({
      itemId,
      req,
    }: {
      itemId: number;
      req: PatchItemDiscardedReq;
    }) => patchItemDiscarded(itemId, req),
  });
};
