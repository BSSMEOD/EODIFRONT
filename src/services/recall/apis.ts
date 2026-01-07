import { eodi } from '@/api/instance/instance';
import {
  GetRecallRequestsParams,
  GetRecallRequestsRes,
} from '@/types/recall/remote';

export const getRecallRequests = async (params?: GetRecallRequestsParams) => {
  const { data } = await eodi.get<GetRecallRequestsRes>(
    '/items/claims/requests',
    { params }
  );
  return data;
};

export const approveRecallRequest = async (claimId: number) => {
  const { data } = await eodi.post(`/items/claims/${claimId}/approve`);
  return data;
};

export const rejectRecallRequest = async (claimId: number) => {
  const { data } = await eodi.post(`/items/claims/${claimId}/reject`);
  return data;
};
