'use client';

import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import font from '@styles/font';
import color from '@styles/color';
import DisposalTable from '@components/disposal/DisposalTable/DisposalTable';
import Dropdown from '@components/common/Dropdown/Dropdown';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import type { GetItemListParams } from '@/types/item/params';

const DisposalPage = () => {
  const approvalOptions = [
    { label: '보류', value: 'PENDING' },
    { label: '예정', value: 'APPROVED' },
  ];

  const approvalLabelMap: Record<string, string> = {
    PENDING: '보류',
    APPROVED: '예정',
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [filters, setFilters] = useState({
    date: '',
    approval: '',
  });

  const [displayFilters, setDisplayFilters] = useState({
    date: '',
    approval: '',
  });

  const handleFilterChange = (value: string, name: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (name === 'approval') {
      setDisplayFilters((prev) => ({
        ...prev,
        [name]: approvalLabelMap[value] || value,
      }));
    } else {
      setDisplayFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const dateStr = `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'yyyy.MM.dd')}`;
      setFilters((prev) => ({ ...prev, date: dateStr }));
      setDisplayFilters((prev) => ({ ...prev, date: dateStr }));
    } else {
      setFilters((prev) => ({ ...prev, date: '' }));
      setDisplayFilters((prev) => ({ ...prev, date: '' }));
    }
  };

  const handleRemoveFilter = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: '' }));
    setDisplayFilters((prev) => ({ ...prev, [name]: '' }));
    if (name === 'date') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const apiFilters = useMemo<Omit<GetItemListParams, 'status'>>(() => {
    const params: Omit<GetItemListParams, 'status'> = {};
    if (startDate && endDate) {
      params.foundAtFrom = format(startDate, 'yyyy-MM-dd');
      params.foundAtTo = format(endDate, 'yyyy-MM-dd');
    }

    if (filters.approval) {
      params.approvalStatus = filters.approval as
        | 'PENDING'
        | 'APPROVED'
        | 'REJECTED';
    }

    return params;
  }, [startDate, endDate, filters.approval]);

  return (
    <StyledDisposalPage>
      <Title>폐기 예정 물품</Title>
      <FilterWrapper>
        <FilterDateSelect
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />

        <Dropdown
          name="approval"
          data={approvalOptions}
          value={filters.approval}
          onChange={handleFilterChange}
          placeholder="승인 상태"
          width="140px"
        />

        <FilterActiveTags
          filters={displayFilters}
          onRemove={handleRemoveFilter}
        />
      </FilterWrapper>

      <DisposalTable filters={apiFilters} />
    </StyledDisposalPage>
  );
};

export default DisposalPage;

const StyledDisposalPage = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  ${font.H1}
  color: ${color.black};
  margin-bottom: 24px;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;
