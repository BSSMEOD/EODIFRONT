export interface PointItem {
  itemId: number;
  itemName: string;
  studentName: string;
  status: 'paid' | 'unpaid';
  receivedAt: string;
}
