import { eodi } from '@/api/instance/instance';
import {
  GetRecallRequestsParams,
  GetRecallRequestsRes,
  ApproveRejectReq,
  ApproveRejectRes,
} from '@/types/recall/remote';

export const getRecallRequests = async (params?: GetRecallRequestsParams) => {
  const { data } = await eodi.get<GetRecallRequestsRes>(
    '/items/claims/requests',
    { params }
  );
  return data;
};

export const approveRecallRequest = async (
  itemId: number,
  req: ApproveRejectReq
) => {
  const { data } = await eodi.patch<ApproveRejectRes>(
    `/items/${itemId}/approve`,
    req
  );
  return data;
};

export const rejectRecallRequest = async (
  itemId: number,
  req: ApproveRejectReq
) => {
  const { data } = await eodi.patch<ApproveRejectRes>(
    `/items/${itemId}/approve`,
    req
  );
  return data;
};
