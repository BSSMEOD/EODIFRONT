'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import { useState } from 'react';
import RecallRequestList from '@components/recall/RecallRequestList/RecallRequestList';

const RecallPage = () => {
  const sortOptions = ['최신순', '오래된순'];
  const categoryOptions = ['전체', '문구류', '전자기기', '의류', '기타'];
  const timeOptions = ['전체', '1주일', '1개월', '3개월'];
  const locationOptions = ['전체', '1층', '2층', '3층', '운동장'];

  const [filters, setFilters] = useState({
    sort: '',
    category: '',
    time: '',
    location: '',
  });

  const handleFilterChange = (value: string, name: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveFilter = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <StyledRecallPage>
      <FilterWrapper>
        <Dropdown
          name="sort"
          data={sortOptions}
          value={filters.sort}
          onChange={handleFilterChange}
          placeholder="최신순"
          width="100px"
        />

        <Dropdown
          name="category"
          data={categoryOptions}
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="물품"
          width="100px"
        />

        <Dropdown
          name="time"
          data={timeOptions}
          value={filters.time}
          onChange={handleFilterChange}
          placeholder="시간"
          width="100px"
        />

        <Dropdown
          name="location"
          data={locationOptions}
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="장소"
          width="100px"
        />

        <FilterActiveTags filters={filters} onRemove={handleRemoveFilter} />
      </FilterWrapper>

      <RecallRequestList />
    </StyledRecallPage>
  );
};

export default RecallPage;

const StyledRecallPage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;
