'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import BigProductList from '@components/common/ProductList/BigProductList';
import SearchInput from '@ui/Input/SearchInput';
import Dropdown from '@ui/Dropdown/Dropdown';
import { CATEGORY } from '@/constants/product/constant';
import Flex from '@ui/Flex/Flex';

interface Filters {
  search: string;
  category: string;
  time: string;
  location: string;
}

const ManagePage = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    time: '',
    location: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const categoryOptions = CATEGORY.map((category) => ({
    label: category,
    value: category,
  }));
  const timeOptions = [
    { label: '최신순', value: 'latest' },
    { label: '오래된순', value: 'oldest' },
  ];
  const locationOptions = [
    { label: '운동장', value: 'playground' },
    { label: '도서관', value: 'library' },
    { label: '강의실', value: 'classroom' },
  ];

  const mockProducts = [
    {
      id: 1,
      title: '긱시크 안경',
      imageUrl: '',
      date: '2025.06.19.',
      location: '기타 / 운동장',
      status: 'LOST' as const,
    },
    {
      id: 2,
      title: '검정 우산',
      imageUrl: '',
      date: '2025.06.19.',
      location: '기타 / 운동장',
      status: 'LOST' as const,
    },
    {
      id: 3,
      title: '무선 이어폰 (버즈2)',
      imageUrl: '',
      date: '2025.06.19.',
      location: '기타 / 운동장',
      status: 'FOUND' as const,
    },
  ];

  return (
    <StyledManagePage>
      <SearchInput value={filters.search} onChange={handleSearchChange} />
      <Flex gap={12} align="center">
        <Dropdown
          data={categoryOptions}
          onChange={handleDropdownChange('category')}
          name="category"
          placeholder="물품"
          value={filters.category}
          width="100px"
        />
        <Dropdown
          data={timeOptions}
          onChange={handleDropdownChange('time')}
          name="time"
          placeholder="시간"
          value={filters.time}
          width="100px"
        />
        <Dropdown
          data={locationOptions}
          onChange={handleDropdownChange('location')}
          name="location"
          placeholder="장소"
          value={filters.location}
          width="100px"
        />
      </Flex>
      <BigProductList productList={mockProducts} auth />
    </StyledManagePage>
  );
};

const StyledManagePage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ManagePage;
