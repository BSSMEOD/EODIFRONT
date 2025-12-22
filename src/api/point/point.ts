import { eodi } from '@/api/instance/instance';
import type {
  GiveRewardRequest,
  GiveRewardResponse,
  RewardHistoryResponse,
  RewardHistoryParams,
} from '@/types/point/client';

export const giveReward = async (
  data: GiveRewardRequest
): Promise<GiveRewardResponse> => {
  const response = await eodi.post<GiveRewardResponse>('/rewards', data);
  return response.data;
};

export const getRewardHistory = async (
  params: RewardHistoryParams
): Promise<RewardHistoryResponse> => {
  const response = await eodi.get<RewardHistoryResponse>('/rewards/history', {
    params: {
      user_id: params.userId,
      date: params.date,
      grade: params.grade,
      class: params.class,
    },
  });
  return response.data;
};
