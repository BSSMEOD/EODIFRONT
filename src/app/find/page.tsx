'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import SearchInput from '@components/common/Input/SearchInput';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import IconMinus from '@/icons/src/IconMinus';
import Pagination from '@components/common/Pagination/Pagination';
import Flex from '@components/common/Flex/Flex';
import { useFindPage } from './find.hooks';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { CATEGORY } from '@/constants/item/constant';

const FindPage = () => {
  const {
    currentPage,
    setCurrentPage,
    filters,
    handleSearchChange,
    handleMultiSelectFilterChange,
    handleDateChange,
    handleRemoveFilter,
    itemListData,
    locationOptions,
    isLoading,
    error,
  } = useFindPage();

  const allItems = itemListData?.content || [];
  const totalPages = itemListData?.totalPages || 0;

  const categoryOptions = [...CATEGORY];

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height={200} color={color.gray500}>
        분실물 목록을 불러오고 있습니다...
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height={200} color={color.red}>
        분실물 목록을 불러오는 중 오류가 발생했습니다.
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={20} width="100%" style={{ paddingTop: 40 }}>
      <SearchInput value={filters.query} onChange={handleSearchChange} />
      <Flex align="center" gap={12} wrap="wrap">
        <MultiSelectDropdown
          name="category"
          data={categoryOptions}
          value={filters.category}
          onChange={handleMultiSelectFilterChange}
          placeholder="물품"
          width="120px"
        />
        <FilterDateSelect
          startDate={filters.startDate}
          endDate={filters.endDate}
          onChange={handleDateChange}
        />
        <MultiSelectDropdown
          name="location"
          data={locationOptions}
          value={filters.location}
          onChange={handleMultiSelectFilterChange}
          placeholder="장소"
          width="120px"
        />
        {filters.category.length > 0 && (
          <FilterTag>
            <span>
              {filters.category.length === 1
                ? filters.category[0]
                : `${filters.category[0]} 외 ${filters.category.length - 1}`}
            </span>
            <RemoveButton onClick={() => handleRemoveFilter('category')}>
              <IconMinus width={10} color={color.white} />
            </RemoveButton>
          </FilterTag>
        )}
        {filters.location.length > 0 && (
          <FilterTag>
            <span>
              {filters.location.length === 1
                ? filters.location[0]
                : `${filters.location[0]} 외 ${filters.location.length - 1}`}
            </span>
            <RemoveButton onClick={() => handleRemoveFilter('location')}>
              <IconMinus width={10} color={color.white} />
            </RemoveButton>
          </FilterTag>
        )}
      </Flex>

      <Flex direction="row" wrap="wrap" gap={20} width="100%">
        {allItems.length > 0 ? (
          allItems.map((item) => (
            <div key={item.id} style={{ width: 'calc(50% - 10px)' }}>
              <ProductListItem product={item} size="big" />
            </div>
          ))
        ) : (
          <Flex
            justify="center"
            align="center"
            height={100}
            width="100%"
            color={color.gray500}
          >
            검색 결과가 없습니다.
          </Flex>
        )}
      </Flex>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Flex>
  );
};

export default FindPage;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.primary};
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
