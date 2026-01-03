import { CATEGORY } from '@/constants/item/constant';

export type Status = 'LOST' | 'FOUND' | 'TO_BE_DISCARDED' | 'DISCARDED';

export interface Item {
  id: number;
  imageUrl: string;
  reporterStudentCode: number;
  reporterName: string;
  name: string;
  foundAt: string;
  foundPlace: string;
  foundPlaceDetail: string;
  status: Status;
  category: (typeof CATEGORY)[number];
}

export interface Place {
  id: number;
  name: string;
}
