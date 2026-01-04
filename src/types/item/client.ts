import { CATEGORY } from '@/constants/item/constant';

export type Status = 'LOST' | 'FOUND' | 'TO_BE_DISCARDED' | 'DISCARDED';

export interface Item {
  id: number;
  imageUrl: string;
  reporterStudentCode?: number;
  reporterName: string;
  name: string;
  foundAt?: Date;
  foundPlace: string;
  foundPlaceDetail: string;
  status: Status;
  category?: (typeof CATEGORY)[number];
}

export interface ItemForm extends Omit<
  Item,
  'id' | 'status' | 'foundPlace' | 'imageUrl'
> {
  placeId: string;
}

export interface Place {
  id: number;
  name: string;
}
