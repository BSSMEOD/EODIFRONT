export interface GiveRewardRequest {
  studentId: number;
  itemId: number;
}

export interface GiveRewardResponse {
  message?: string;
}

export interface RewardHistoryItem {
  received_at: string;
  student_name: string;
  item_name: string;
  given_at: string | null;
}

export interface RewardHistoryResponse {
  histories: RewardHistoryItem[];
}

export interface RewardHistoryParams {
  userId?: number;
  date?: string;
  grade?: number;
  class?: number;
}

export interface PointItem {
  itemId: number;
  studentId: number;
  itemName: string;
  studentName: string;
  reporter: string;
  status: 'paid' | 'unpaid';
  receivedAt: string;
  givenAt: string | null;
}
