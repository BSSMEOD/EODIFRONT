import { eodi } from '@/api/instance/instance';
import type { GetItemListRes } from '@/types/item/response';
import type { GetItemListParams } from '@/types/item/params';
import authorization from '@/api/token/token';

export const getAdminDisposalItems = async (params: GetItemListParams) => {
  const { data } = await eodi.get<GetItemListRes>('/items/search', {
    params: {
      ...params,
      status: 'TO_BE_DISCARDED',
    },
  });
  return data;
};

export interface PostDisposalReasonReq {
  reason: string;
  days: number;
}

export interface PostDisposalReasonRes {
  message: string;
  reasonId: number;
}

export const postDisposalReason = async (
  itemId: number,
  req: PostDisposalReasonReq
): Promise<PostDisposalReasonRes> => {
  const { data } = await eodi.post(
    `/items/${itemId}/disposal-reason`,
    req,
    authorization()
  );
  return data;
};

export interface PatchItemDiscardedReq {
  reasonId: number;
}

export interface PatchItemDiscardedRes {
  message: string;
  extendedDisposalDate: string;
}

export interface GetDisposalReasonRes {
  itemId: number;
  reason: string;
  teacherName: string;
  extensionDays: number;
}

export const getDisposalReason = async (
  itemId: number
): Promise<GetDisposalReasonRes> => {
  const { data } = await eodi.get(
    `/items/${itemId}/disposal-reason`,
    authorization()
  );
  return data;
};

export const patchItemDiscarded = async (
  itemId: number,
  req: PatchItemDiscardedReq
): Promise<PatchItemDiscardedRes> => {
  const { data } = await eodi.patch(
    `/items/${itemId}/discarded`,
    req,
    authorization()
  );
  return data;
};
