import { create } from 'zustand';
import { Product } from '@/types/product/client';

interface ProductListInfo {
  recallProductList: Product[];
  count: 0;
}

export const useRecallStore = create<ProductListInfo>((set) => ({
  recallProductList: [
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
  count: 0,
}));
