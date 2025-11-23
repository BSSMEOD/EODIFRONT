import { Product } from '@/types/product/client';

export interface ProductListProps {
  title?: string;
  productList: Product[];
  href?: string;
  auth?: boolean;
}
