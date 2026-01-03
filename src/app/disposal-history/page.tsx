'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { useDisposalHistory } from '@/app/disposal-history/disposal-history.hooks';
import { formatDateDot } from '@/utils/formatDate';
import IconMinus from '@/icons/src/IconMinus';
import color from '@styles/color';
const DisposalHistoryPage = () => {
  const { filters, options, data } = useDisposalHistory();

  return (
    <StyledDisposalHistoryPage>
      <FilterSection>
        <Flex gap={12} align="center" wrap="wrap">
          <Dropdown
            data={options.disposalDateOptions}
            onChange={filters.handleDropdownChange('disposalDate')}
            name="disposalDate"
            placeholder="폐기일"
            value={filters.filters.disposalDate}
            width="120px"
          />
          <MultiSelectDropdown
            name="categories"
            data={options.categoryOptions}
            onChange={filters.handleMultiSelectChange}
            placeholder="물품"
            value={filters.filters.categories}
            width="120px"
          />
          <FilterDateSelect
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={filters.handleDateChange}
          />
          <MultiSelectDropdown
            name="locations"
            data={options.locationOptions}
            onChange={filters.handleMultiSelectChange}
            placeholder="장소"
            value={filters.filters.locations}
            width="120px"
          />

          {filters.filters.categories.length > 0 && (
            <FilterTag>
              <span>
                {filters.filters.categories.length === 1
                  ? filters.filters.categories[0]
                  : `${filters.filters.categories[0]} 외 ${filters.filters.categories.length - 1}`}
              </span>
              <RemoveButton
                onClick={() => filters.handleRemoveFilter('categories')}
              >
                <IconMinus width={10} color={color.white} />
              </RemoveButton>
            </FilterTag>
          )}

          {filters.filters.locations.length > 0 && (
            <FilterTag>
              <span>
                {filters.filters.locations.length === 1
                  ? filters.filters.locations[0]
                  : `${filters.filters.locations[0]} 외 ${filters.filters.locations.length - 1}`}
              </span>
              <RemoveButton
                onClick={() => filters.handleRemoveFilter('locations')}
              >
                <IconMinus width={10} color={color.white} />
              </RemoveButton>
            </FilterTag>
          )}

          {filters.filters.date && (
            <FilterTag>
              <span>{filters.filters.date}</span>
              <RemoveButton onClick={() => filters.handleRemoveFilter('date')}>
                <IconMinus width={10} color={color.white} />
              </RemoveButton>
            </FilterTag>
          )}
        </Flex>
      </FilterSection>

      {data.isLoading ? (
        <div>폐기 이력을 불러오는 중...</div>
      ) : data.error ? (
        <div>폐기 이력을 불러오는 중 오류가 발생했습니다.</div>
      ) : data.disposalHistoryItems.length === 0 ? (
        <div>폐기 이력이 없습니다.</div>
      ) : (
        <DisposalHistoryList>
          {data.disposalHistoryItems.map((item) => (
            <DisposalHistoryItem key={item.id}>
              <Flex direction="row" gap={20} align="center" width="755px">
                <ProductImage
                  src={item.imageUrl}
                  alt="분실물 사진"
                  width={98}
                  height={98}
                />
                <Flex direction="column" justify="space-between" height="100%">
                  <Text variant="H2">{item.name}</Text>
                  <Text variant="p2" color={color.gray200}>
                    {formatDateDot(item.foundAt)}
                  </Text>
                  <Text variant="p2">
                    {item.foundPlace} / {item.foundPlaceDetail}
                  </Text>
                </Flex>
              </Flex>
              <DisposalDate>
                <Text variant="p2">
                  {item.disposalDate
                    ? `${formatDateDot(item.disposalDate)} 폐기`
                    : '폐기일 미정'}
                </Text>
              </DisposalDate>
            </DisposalHistoryItem>
          ))}
        </DisposalHistoryList>
      )}
    </StyledDisposalHistoryPage>
  );
};

const StyledDisposalHistoryPage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.secondary};
  color: ${color.white};
  border-radius: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;

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

const DisposalHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DisposalHistoryItem = styled.div`
  width: 100%;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${color.gray200} 1px solid;
  border-radius: 8px;
  background: white;
`;

const ProductImage = styled.img`
  border-radius: 12px;
  object-fit: contain;
  width: 98px;
  height: 98px;
  background: ${color.gray100};
`;

const DisposalDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
`;

export default DisposalHistoryPage;
