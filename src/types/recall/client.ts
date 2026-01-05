export interface RecallRequest {
  requestId: number;
  itemId: number;
  itemName: string;
  imageUrl: string;
  requestMessage: string;
  requesterName: string;
  requesterType: string;
  requestedAt: string; // ISO 8601 형식
  status: RecallStatus;
}

export type RecallStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

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
