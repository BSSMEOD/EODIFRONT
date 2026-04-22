import { eodi } from '@/api/instance/instance';
import type {
  GiveRewardResponse,
  RewardRequestListResponse,
} from '@/types/point/response';
import type { GiveRewardRequest } from '@/types/point/params';

export const postGiveReward = async (
  data: GiveRewardRequest
): Promise<GiveRewardResponse> => {
  const response = await eodi.post<GiveRewardResponse>('/rewards', data);
  return response.data;
};

export const fetchRewardRequestList =
  async (): Promise<RewardRequestListResponse> => {
    const response = await eodi.get<RewardRequestListResponse>('/rewards');
    return response.data;
  };
