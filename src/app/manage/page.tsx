'use client';

import styled from '@emotion/styled';
import BigProductList from '@components/common/ProductList/BigProductList';
import SearchInput from '@components/common/Input/SearchInput';
import Dropdown from '@components/common/Dropdown/Dropdown';
import { CATEGORY } from '@/constants/item/constant';
import Flex from '@components/common/Flex/Flex';
import { useForm } from '@app/manage/manage.hooks';

const ManagePage = () => {
  const { filters, handleInputChange, handleDropdownChange } = useForm();

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

  return (
    <StyledManagePage>
      <SearchInput
        value={filters.search}
        onChange={handleInputChange}
        name="search"
      />
      <Flex gap={12} align="center">
        <Dropdown
          data={categoryOptions}
          onChange={handleDropdownChange}
          name="category"
          placeholder="카테고리"
          value={filters.category}
          width={120}
        />
        <Dropdown
          data={timeOptions}
          onChange={handleDropdownChange}
          name="time"
          placeholder="시간"
          value={filters.time}
          width={100}
        />
        <Dropdown
          data={locationOptions}
          onChange={handleDropdownChange}
          name="location"
          placeholder="장소"
          value={filters.location}
          width={100}
        />
      </Flex>
      <BigProductList productList={[]} auth />
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
