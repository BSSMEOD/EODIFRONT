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

const updateRecallStatus = async (itemId: number, req: ApproveRejectReq) => {
  const { data } = await eodi.patch<ApproveRejectRes>(
    `/items/${itemId}/approve`,
    req
  );
  return data;
};

export const approveRecallRequest = (itemId: number, req: ApproveRejectReq) =>
  updateRecallStatus(itemId, req);

export const rejectRecallRequest = (itemId: number, req: ApproveRejectReq) =>
  updateRecallStatus(itemId, req);
