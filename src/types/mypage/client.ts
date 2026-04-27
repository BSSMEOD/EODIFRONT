import type { RecallStatus } from '@/types/recall/client';

export interface MyRecallItem {
  claimId: number;
  itemId: number;
  itemName: string;
  requestedAt: string;
  imageUrl: string;
  status: RecallStatus;
}
