'use client';

import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import color from '@styles/color';
import font from '@styles/font';
import Dropdown from '@components/common/Dropdown/Dropdown';
import LogTable from '@components/log/LogTable/LogTable';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import type { GetLogListParams } from '@/types/log/remote';

const LogPage = () => {
  const gradeOptions = ['1학년', '2학년', '3학년'];
  const classOptions = ['1반', '2반', '3반', '4반'];
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [filters, setFilters] = useState({
    date: '',
    grade: '',
    class: '',
  });

  const handleFilterChange = (value: string, name: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const dateStr = `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'yyyy.MM.dd')}`;
      setFilters((prev) => ({ ...prev, date: dateStr }));
    } else if (start && !end) {
    } else {
      setFilters((prev) => ({ ...prev, date: '' }));
    }
  };

  const handleRemoveFilter = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: '' }));
    if (name === 'date') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const apiFilters = useMemo<GetLogListParams>(() => {
    const params: GetLogListParams = {};
    return params;
  }, [filters]);

  return (
    <StyledLogPage>
      <Title>지급내역보기</Title>
      <FilterWrapper>
        <FilterDateSelect
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />
        <Dropdown
          name="grade"
          data={gradeOptions}
          value={filters.grade}
          onChange={handleFilterChange}
          placeholder="학년"
          width="120px"
        />
        <Dropdown
          name="class"
          data={classOptions}
          value={filters.class}
          onChange={handleFilterChange}
          placeholder="반"
          width="120px"
        />
        <FilterActiveTags filters={filters} onRemove={handleRemoveFilter} />
      </FilterWrapper>
      <LogTable filters={apiFilters} />
    </StyledLogPage>
  );
};

export default LogPage;

const StyledLogPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
