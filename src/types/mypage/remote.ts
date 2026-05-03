import type { RecallStatus } from '@/types/recall/client';

export interface GetMyClaimsParams {
  page?: number;
  size?: number;
}

export interface MyClaim {
  claimId: number;
  itemId: number;
  itemName: string;
  imageUrl: string;
  requestedAt: string;
  status: RecallStatus;
}

export interface GetMyClaimsRes {
  page: number;
  size: number;
  total: number;
  claims: MyClaim[];
}
