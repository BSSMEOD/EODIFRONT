import { STATUS } from '@/constants/product/constant';

export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  status: keyof typeof STATUS;
}
