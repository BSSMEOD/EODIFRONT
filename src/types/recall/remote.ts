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
}

export type ApproveRejectRes = ApprovalResponse;
