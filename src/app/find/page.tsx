'use client';

import styled from '@emotion/styled';
import color from '@styles/color';
import SearchInput from '@components/common/Input/SearchInput';
import ProductListItem from '@components/common/ProductList/ProductListItem/ProductListItem';
import BigProductList from '@components/common/ProductList/BigProductList';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import Pagination from '@components/common/Pagination/Pagination';
import Flex from '@components/common/Flex/Flex';
import { useFindPage } from './find.hooks';
import useMobile from '@hooks/useMobile';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { CATEGORY } from '@/constants/item/constant';
import Text from '@components/common/Text/Text';
import Dropdown from '@components/common/Dropdown/Dropdown';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';

const FindPage = () => {
  const isMobile = useMobile();
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
        <SearchInput
          value={filters.query}
          onChange={handleSearchChange}
          placeholder={
            isMobile
              ? '분실물을 검색해보세요.'
              : '분실물의 이름을 검색해 분실물을 찾아보세요.'
          }
        />
        <Flex align="center" gap={12} wrap="wrap">
          <Dropdown
            name="category"
            data={categoryOptions}
            value={filters.category}
            onChange={handleDropdownChange}
            placeholder="물품"
            width={120}
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
            width={120}
          />
          <FilterActiveTags
            filters={displayFilters}
            onRemove={handleRemoveFilter}
          />
        </Flex>
        {isLoading ? (
          <Text width="100%" textAlign="center" color={color.gray500}>
            분실물 목록을 불러오고 있습니다...
          </Text>
        ) : allItems.length > 0 ? (
          isMobile ? (
            <BigProductList productList={allItems} />
          ) : (
            <Flex direction="row" wrap="wrap" gap={20} width="100%">
              {allItems.map((item) => (
                <ItemWrapper key={item.id}>
                  <ProductListItem product={item} size="big" />
                </ItemWrapper>
              ))}
            </Flex>
          )
        ) : (
          <Text width="100%" textAlign="center" color={color.gray500}>
            검색 결과가 없습니다.
          </Text>
        )}

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
  padding-top: 32px;
`;

const ItemWrapper = styled.div`
  width: calc(50% - 10px);
`;
