'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import font from '@styles/font';
import color from '@styles/color';
import DisposalTable from '@components/disposal/DisposalTable/DisposalTable';
import Dropdown from '@ui/Dropdown/Dropdown';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';

const DisposalPage = () => {
  const holdOptions = ['보류', '예정'];
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [filters, setFilters] = useState({
    date: '',
    hold: '',
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
          name="hold"
          data={holdOptions}
          value={filters.hold}
          onChange={handleFilterChange}
          placeholder="보류 여부"
          width="140px"
        />

        <FilterActiveTags filters={filters} onRemove={handleRemoveFilter} />
      </FilterWrapper>

      <DisposalTable />
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
