export interface RecallRequest {
  requestId: number;
  itemId: number;
  itemName: string;
  imageUrl: string;
  requesterName: string;
  requesterType: string;
  requestedAt: string;
  status: RecallStatus;
  visitDate: string;
}

export type RecallStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RecallRequestItem {
  id: number;
  name: string;
  imageUrl: string;
  requesterName: string;
  requestedAt: string;
  recallStatus: RecallStatus;
  visitDate: string;
}

export interface ApprovalResponse {
  itemId: number;
  approvalStatus: 'APPROVED' | 'REJECTED';
  approver: {
    id: number;
    name: string;
  };
  approvedAt: string;
  message: string;
}
