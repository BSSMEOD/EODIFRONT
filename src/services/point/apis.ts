import { giveReward, getRewardHistory } from '@/api/point/point';
import type {
  GiveRewardRequest,
  GiveRewardResponse,
  RewardHistoryResponse,
  RewardHistoryParams,
} from '@/types/point/client';

export const postGiveReward = async (
  data: GiveRewardRequest
): Promise<GiveRewardResponse> => {
  return await giveReward(data);
};

export const fetchRewardHistory = async (
  params: RewardHistoryParams
): Promise<RewardHistoryResponse> => {
  return await getRewardHistory(params);
};
