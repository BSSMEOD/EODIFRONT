'use client';

import styled from '@emotion/styled';
import BigProductList from '@components/common/ProductList/BigProductList';
import SearchInput from '@components/common/Input/SearchInput';
import Dropdown from '@components/common/Dropdown/Dropdown';
import { CATEGORY } from '@/constants/item/constant';
import Flex from '@components/common/Flex/Flex';
import { useForm } from '@app/manage/manage.hooks';
import FilterDateSelect from '@components/common/Filter/FilterDateSelect/FilterDateSelect';
import { useItemListQuery, usePlaceListQuery } from '@services/item/queries';
import MultiSelectDropdown from '@components/common/Dropdown/MultiSelectDropdown';
import Pagination from '@components/common/Pagination/Pagination';
import { useEffect, useMemo, useState } from 'react';
import { useRequireRole } from '@hooks/useRequireRole';
import useMobile from '@hooks/useMobile';
import FilterActiveTags from '@components/common/Filter/FilterActiveTags/FilterActiveTags';
import { formatRangeDateDot } from '@utils/formatDate';

const ManagePage = () => {
  useRequireRole('ADMIN');

  const isMobile = useMobile();
  const [page, setPage] = useState<number>(1);

  const {
    filters,
    handleInputChange,
    handleDropdownChange,
    handleDateChange,
    buildItemListParams,
  } = useForm();

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data: productListData } = useItemListQuery({
    page: page,
    ...buildItemListParams(filters),
  });

  const { data: placeListData } = usePlaceListQuery();
  const placeOptions = useMemo(
    () =>
      placeListData?.map((place) => ({
        label: place.name,
        value: place.id.toString(),
      })) ?? [],
    [placeListData]
  );

  const displayFilters = useMemo<Record<string, string>>(() => {
    const category = filters.category;
    const date =
      filters.startDate && filters.endDate
        ? formatRangeDateDot(filters.startDate, filters.endDate)
        : '';

    const selectedPlaceLabels = filters.placeIds
      .map(
        (placeId) =>
          placeOptions.find((option) => option.value === placeId)?.label ?? ''
      )
      .filter((label) => label !== '');

    const place =
      selectedPlaceLabels.length === 0
        ? ''
        : selectedPlaceLabels.length === 1
          ? selectedPlaceLabels[0]
          : `${selectedPlaceLabels[0]} 외 ${selectedPlaceLabels.length - 1}개`;

    return {
      category,
      date,
      place,
    };
  }, [
    filters.category,
    filters.startDate,
    filters.endDate,
    filters.placeIds,
    placeOptions,
  ]);

  const handleRemoveFilter = (key: string) => {
    if (key === 'category') {
      handleDropdownChange('', 'category');
      return;
    }

    if (key === 'date') {
      handleDateChange([null, null]);
      return;
    }

    if (key === 'place') {
      handleDropdownChange([], 'placeIds');
    }
  };

  return (
    <StyledManagePage>
      <SearchInput
        value={filters.search}
        onChange={handleInputChange}
        name="search"
        placeholder={
          isMobile
            ? '분실물을 검색해보세요.'
            : '분실물의 이름을 검색해 분실물을 찾아보세요.'
        }
      />
      <Flex gap={12} align="center" wrap="wrap">
        <Dropdown
          data={CATEGORY}
          onChange={handleDropdownChange}
          name="category"
          placeholder="카테고리"
          value={filters.category}
          width={120}
        />
        <FilterDateSelect
          startDate={filters.startDate}
          endDate={filters.endDate}
          onChange={handleDateChange}
          maxDate={new Date()}
        />
        <MultiSelectDropdown
          value={filters.placeIds}
          data={placeOptions}
          onChange={handleDropdownChange}
          placeholder="장소"
          name="placeIds"
          width={120}
        />
        <FilterActiveTags
          filters={displayFilters}
          onRemove={handleRemoveFilter}
        />
      </Flex>
      <BigProductList
        productList={productListData?.content || []}
        auth
        showStatus
      />
      <Pagination
        currentPage={page}
        totalPages={productListData?.totalPages || 1}
        onPageChange={(pageNumber) => setPage(pageNumber)}
      />
    </StyledManagePage>
  );
};

const StyledManagePage = styled.div`
  width: 100%;
  padding-top: 59px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ManagePage;
