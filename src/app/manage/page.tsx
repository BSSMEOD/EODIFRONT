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
import { useItemDeleteMutation } from '@services/item/mutations';

const ManagePage = () => {
  const {
    filters,
    handleInputChange,
    handleDropdownChange,
    handleDateChange,
    buildItemListParams,
  } = useForm();

  const { data: productListData } = useItemListQuery({
    page: 1,
    size: 10,
    ...buildItemListParams(filters),
  });

  const { data: placeListData } = usePlaceListQuery();
  const placeOptions =
    placeListData?.map((place) => ({
      label: place.name,
      value: place.id.toString(),
    })) ?? [];

  return (
    <StyledManagePage>
      <SearchInput
        value={filters.search}
        onChange={handleInputChange}
        name="search"
      />
      <Flex gap={12} align="center">
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
        />
        <MultiSelectDropdown
          value={filters.placeIds}
          data={placeOptions}
          onChange={handleDropdownChange}
          placeholder="장소"
          name="placeIds"
          width={200}
        />
      </Flex>
      <BigProductList productList={productListData?.content || []} auth />
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
