import { create } from 'zustand';
import { Product } from '@/types/product/client';

interface ProductListInfo {
  disposalProductList: Product[];
}

export const useDisposalStore = create<ProductListInfo>((set) => ({
  disposalProductList: [
    {
      id: 1,
      imageUrl: '',
      title: '테무 안경',
      date: '2025년 6월 19일',
      location: '기타/운동장',
    },
    {
      id: 1,
      imageUrl: '',
      title: '테무 안경',
      date: '2025년 6월 19일',
      location: '기타/운동장',
    },
    {
      id: 1,
      imageUrl: '',
      title: '테무 안경',
      date: '2025년 6월 19일',
      location: '기타/운동장',
    },
  ],
}));
