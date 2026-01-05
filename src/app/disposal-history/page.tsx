'use client';

import styled from '@emotion/styled';
import Dropdown from '@components/common/Dropdown/Dropdown';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { useDisposalHistory } from '@/app/disposal-history/disposal-history.hooks';
import { formatDateDot } from '@/utils/formatDate';
import Pagination from '@components/common/Pagination/Pagination';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import IconMinus from '@/icons/src/IconMinus';
import color from '@styles/color';
const DisposalHistoryPage = () => {
  const { filters, options, data, utils } = useDisposalHistory();

  return (
    <PageContainer direction="column" gap={20} width="100%">
      <Flex justify="flex-start" align="center">
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
                  ? utils.getCategoryLabel(filters.filters.categories[0])
                  : `${utils.getCategoryLabel(filters.filters.categories[0])} 외 ${filters.filters.categories.length - 1}`}
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
                  ? utils.getLocationLabel(filters.filters.locations[0])
                  : `${utils.getLocationLabel(filters.filters.locations[0])} 외 ${filters.filters.locations.length - 1}`}
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
      </Flex>

      {data.isLoading ? (
        <Flex justify="center" align="center" height={200}>
          <Text variant="p1" color={color.gray500}>
            폐기 이력을 불러오는 중...
          </Text>
        </Flex>
      ) : data.error ? (
        <Flex justify="center" align="center" height={200}>
          <Text variant="p1" color={color.red}>
            폐기 이력을 불러오는 중 오류가 발생했습니다.
          </Text>
        </Flex>
      ) : data.disposalHistoryItems.length === 0 ? (
        <Flex justify="center" align="center" height={200}>
          <Text variant="p1" color={color.gray500}>
            폐기 이력이 없습니다.
          </Text>
        </Flex>
      ) : (
        <Flex direction="column" gap={20}>
          <Flex direction="column" gap={20}>
            {data.disposalHistoryItems.map((item) => (
              <ProductListItem
                key={item.id}
                product={item}
                size="big"
                rightContent={
                  <DateContainer>
                    <Text variant="p2">
                      {item.disposalDate
                        ? `${formatDateDot(item.disposalDate)} 폐기`
                        : '폐기일 미정'}
                    </Text>
                  </DateContainer>
                }
              />
            ))}
          </Flex>
          <Flex justify="center">
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={data.handlePageChange}
            />
          </Flex>
        </Flex>
      )}
    </PageContainer>
  );
};

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

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
`;

const PageContainer = styled(Flex)`
  padding-top: 59px;
`;

export default DisposalHistoryPage;
