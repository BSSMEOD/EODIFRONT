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
