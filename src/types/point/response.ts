export interface GiveRewardResponse {
  message?: string;
}

export interface RewardHistoryItem {
  history_id?: number;
  item_id: number;
  student_id: number;
  received_at: string;
  student_name: string;
  item_name: string;
  given_at: string | null;
}

export interface RewardHistoryResponse {
  histories: RewardHistoryItem[];
}

export interface RewardRequestItem {
  itemId: number;
  itemName: string;
  imageUrl: string;
  reporterName: string;
  reporterStudentCode: number | null;
  claimedAt: string | null;
  isRewarded: boolean;
}

export interface RewardRequestListResponse {
  rewards: RewardRequestItem[];
}
