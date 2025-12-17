'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';

import { useState } from 'react';
import RecallRequestList from '@components/recall/RecallRequestList/RecallRequestList';

const RecallPage = () => {
  const sortOptions = ['최신순', '오래된순'];
  const [filter, setFilter] = useState('최신순');

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <StyledRecallPage>
      <FilterWrapper>
        <Dropdown
          name="sort"
          data={sortOptions}
          value={filter}
          onChange={handleFilterChange}
          placeholder="최신순"
          width="120px"
        />
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
