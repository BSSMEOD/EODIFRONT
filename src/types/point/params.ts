export interface GiveRewardRequest {
  itemId: number;
}

export interface RewardHistoryParams {
  userId?: number;
  date?: string;
  grade?: number;
  class?: number;
}
