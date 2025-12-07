import { Item } from '@/types/item/client';

export interface ProductListProps {
  title?: string;
  productList: Item[];
  href?: string;
  auth?: boolean;
}
