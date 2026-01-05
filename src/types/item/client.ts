import { CATEGORY } from '@/constants/item/constant';

export type Status = 'LOST' | 'FOUND' | 'TO_BE_DISCARDED' | 'DISCARDED';

export type Category = (typeof CATEGORY)[number] | '';

export interface Item {
  id: number;
  imageUrl: string;
  reporterStudentCode: number | null;
  reporterName: string;
  name: string;
  foundAt: string;
  foundPlace: string;
  foundPlaceDetail: string;
  status: Status;
  category: Category;
  disposalDate?: string;
}

export interface ItemForm {
  reporterStudentCode: number | null;
  reporterName: string;
  placeId: string;
  name: string;
  foundAt: string;
  foundPlaceDetail: string;
  category: Category;
}

export interface Place {
  id: number;
  name: string;
}
