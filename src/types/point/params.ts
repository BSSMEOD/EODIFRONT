export interface GiveRewardRequest {
  studentId: number;
  itemId: number;
}

export interface RewardHistoryParams {
  userId?: number;
  date?: string;
  grade?: number;
  class?: number;
}
