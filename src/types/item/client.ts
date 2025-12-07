export type Status = 'LOST' | 'FOUND' | 'TO_BE_DISCARDED' | 'DISCARDED';

export interface Item {
  id: number;
  imageUrl: string;
  name: string;
  foundAt: string;
  foundPlace: string;
  foundPlaceDetail: string;
  status: Status;
}
