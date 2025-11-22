'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { DayPicker, DateRange } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import font from '@styles/font';
import color from '@styles/color';
import DisposalTable from '@components/disposal/DisposalTable/DisposalTable';
import Dropdown from '@ui/Dropdown/Dropdown';
import IconBottomArrow from '@package/icon/src/IconBottomArrow';
import IconMinus from '@package/icon/src/IconMinus';

const DisposalPage = () => {
  const [filters, setFilters] = useState({
    date: '',
    hold: '',
  });
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleFilterChange = (value: string, name: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveFilter = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: '' }));
    if (name === 'date') {
      setSelectedRange(undefined);
    }
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);

    if (!range) {
      setFilters((prev) => ({ ...prev, date: '' }));
      return;
    }

    const { from, to } = range;

    if (from && to) {
      const dateStr = `${format(from, 'yyyy.MM.dd')} ~ ${format(to, 'yyyy.MM.dd')}`;
      setFilters((prev) => ({ ...prev, date: dateStr }));
      setIsCalendarOpen(false);
    } else if (from) {
      setFilters((prev) => ({ ...prev, date: format(from, 'yyyy.MM.dd') }));
    }
  };

  const holdOptions = ['보류', '예정'];

  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== ''
  );

  return (
    <StyledDisposalPage>
      <Title>폐기 예정 물품</Title>
      <FilterWrapper>
        <DatePickerWrapper>
          <DateButton
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            $hasValue={!!filters.date}
          >
            <span>{filters.date || '날짜'}</span>
            <IconWrapper $isOpen={isCalendarOpen}>
              <IconBottomArrow width={11} height={6} color={color.gray500} />
            </IconWrapper>
          </DateButton>
          {isCalendarOpen && (
            <CalendarWrapper>
              <StyledDayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleDateSelect}
                locale={ko}
                weekStartsOn={0}
              />
            </CalendarWrapper>
          )}
        </DatePickerWrapper>
        <Dropdown
          name="hold"
          data={holdOptions}
          value={filters.hold}
          onChange={handleFilterChange}
          placeholder="보류 여부"
          width="140px"
        />
        {activeFilters.map(([key, value]) => (
          <FilterTag key={key}>
            <span> {value}</span>
            <RemoveButton onClick={() => handleRemoveFilter(key)}>
              <IconMinus width={10} color={color.white} />
            </RemoveButton>
          </FilterTag>
        ))}
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

const DatePickerWrapper = styled.div`
  position: relative;
`;

const DateButton = styled.button<{ $hasValue: boolean }>`
  ${font.p2}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 100px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray300};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    color: ${({ $hasValue }) => ($hasValue ? color.black : color.gray500)};
    white-space: nowrap;
  }

  &:hover {
    border-color: ${color.primary};
  }
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 100;
  background-color: ${color.white};
  border: 1px solid ${color.gray200};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const StyledDayPicker = styled(DayPicker)`
  --rdp-accent-color: ${color.primary};
  --rdp-accent-background-color: ${color.lightblue};
  --rdp-day-width: 40px;
  --rdp-day-height: 40px;
  --rdp-day_button-width: 40px;
  --rdp-day_button-height: 40px;

  .rdp-month_caption {
    ${font.H4}
    margin-bottom: 8px;
  }

  .rdp-weekday {
    ${font.p3}
    color: ${color.gray500};
  }

  .rdp-day {
    ${font.p3}
  }

  .rdp-day_button {
    width: 40px;
    height: 40px;
    transition: all 0.15s ease;

    &:hover {
      background-color: ${color.gray100};
    }
  }

  .rdp-selected .rdp-day_button {
    background-color: ${color.primary};
    color: ${color.white};
  }

  .rdp-range_middle .rdp-day_button {
    background-color: ${color.lightblue};
    color: ${color.black};
    border-radius: 0;
    border: none;
  }

  .rdp-today .rdp-day_button {
    font-weight: 700;
    color: ${color.primary};
  }

  .rdp-chevron {
    fill: ${color.gray500};
  }

  .rdp-button_previous,
  .rdp-button_next {
    &:hover {
      background-color: ${color.gray100};
    }
  }
`;

const FilterTag = styled.div`
  ${font.p3}
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.secondary};
  color: ${color.white};
  border-radius: 20px;

  span {
    white-space: nowrap;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
