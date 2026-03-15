'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import SearchInput from '@components/common/Input/SearchInput';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import Pagination from '@components/common/Pagination/Pagination';
import Flex from '@components/common/Flex/Flex';
import { useFindPage } from './find.hooks';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { CATEGORY } from '@/constants/item/constant';
import Text from '@components/common/Text/Text';
import Dropdown from '@components/common/Dropdown/Dropdown';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';

const FindPage = () => {
  const {
    currentPage,
    setCurrentPage,
    filters,
    displayFilters,
    handleSearchChange,
    handleDropdownChange,
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

  if (error) {
    return (
      <Flex justify="center" align="center" height={200} color={color.red}>
        분실물 목록을 불러오는 중 오류가 발생했습니다.
      </Flex>
    );
  }

  return (
    <PageContainer>
      <Flex direction="column" gap={20} width="100%">
        <SearchInput value={filters.query} onChange={handleSearchChange} />
        <Flex align="center" gap={12} wrap="wrap">
          <Dropdown
            name="category"
            data={categoryOptions}
            value={filters.category}
            onChange={handleDropdownChange}
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
          <FilterActiveTags
            filters={displayFilters}
            onRemove={handleRemoveFilter}
          />
        </Flex>
        <Flex direction="row" wrap="wrap" gap={20} width="100%">
          {isLoading ? (
            <Text width="100%" textAlign="center" color={color.gray500}>
              분실물 목록을 불러오고 있습니다...
            </Text>
          ) : allItems.length > 0 ? (
            allItems.map((item) => (
              <ItemWrapper key={item.id}>
                <ProductListItem product={item} size="big" />
              </ItemWrapper>
            ))
          ) : (
            <Text width="100%" textAlign="center" color={color.gray500}>
              검색 결과가 없습니다.
            </Text>
          )}
        </Flex>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Flex>
    </PageContainer>
  );
};

export default FindPage;

const PageContainer = styled.div`
  padding-top: 40px;
`;

const ItemWrapper = styled.div`
  width: calc(50% - 10px);
`;
