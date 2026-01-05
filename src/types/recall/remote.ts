import { RecallRequest, RecallStatus, ApprovalResponse } from './client';

export interface GetRecallRequestsParams {
  page?: number;
  size?: number;
  status?: RecallStatus;
  sort?: 'LATEST' | 'OLDEST';
}

export interface GetRecallRequestsRes {
  page: number;
  size: number;
  total: number;
  requests: RecallRequest[];
}

export interface ApproveRejectReq {
  result: 'APPROVED' | 'REJECTED';
  reason?: string; // 반려 시에만 필요
}

export type ApproveRejectRes = ApprovalResponse;
