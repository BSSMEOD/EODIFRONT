import { eodi } from '@/api/instance/instance';
import type {
  GiveRewardRequest,
  GiveRewardResponse,
} from '@/types/point/client';

export const giveReward = async (
  data: GiveRewardRequest
): Promise<GiveRewardResponse> => {
  const response = await eodi.post<GiveRewardResponse>('/rewards', data);
  return response.data;
};
