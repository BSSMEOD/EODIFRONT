import { STATUS } from '@/constants/item/constant';

export interface Item {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  status: keyof typeof STATUS;
}
