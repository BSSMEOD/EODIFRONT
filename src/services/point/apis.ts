import { eodi } from '@/api/instance/instance';
import type {
  GiveRewardRequest,
  GiveRewardResponse,
  RewardHistoryResponse,
  RewardHistoryParams,
} from '@/types/point/client';

export const postGiveReward = async (
  data: GiveRewardRequest
): Promise<GiveRewardResponse> => {
  const response = await eodi.post<GiveRewardResponse>('/rewards', data);
  return response.data;
};

export const fetchRewardHistory = async (
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
