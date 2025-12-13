export interface GiveRewardRequest {
  studentId: number;
  itemId: number;
}

export interface GiveRewardResponse {
  message?: string;
}

export interface PointItem {
  itemId: number;
  studentId: number;
  itemName: string;
  studentName: string;
  reporter: string;
  status: 'paid' | 'unpaid';
}
