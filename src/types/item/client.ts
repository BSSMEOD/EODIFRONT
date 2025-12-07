export type Status = 'LOST' | 'FOUND' | 'TO_BE_DISCARDED' | 'DISCARDED';

export interface Item {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  status: Status;
}
