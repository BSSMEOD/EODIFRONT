'use client';

import React from 'react';
import styled from '@emotion/styled';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import { Button } from '@components/common/Button/Button';
import ImageUploader from '@components/register/ImageUploader/ImageUploader';
import Input from '@components/common/Input/Input';
import DateSelector from '@components/common/DateSelector/DateSelector';
import InputDropdown from '@components/common/Dropdown/InputDropdown';
import { IconCalendar } from '@/icons/src/IconCalendar';
import { CATEGORY } from '@/constants/item/constant';
import { useForm } from '@app/edit/edit.hooks';
import 'react-datepicker/dist/react-datepicker.css';

interface EditPageProps {
  params: Promise<{
    id: number;
  }>;
}

const EditPage = ({ params }: EditPageProps) => {
  const { id } = React.use(params);
  const {
    fileRef,
    form,
    imagePreview,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleFileChange,
    handleSubmit,
    isLoading,
  } = useForm(id);

  if (isLoading) return null;

  return (
    <StyledEditPage>
      <Flex direction="row" justify="space-between" align="center">
        <Text variant="H2">분실물 수정하기</Text>
        <Button styleType="SECONDARY" onClick={handleSubmit}>
          수정 완료
        </Button>
      </Flex>
      <Flex direction="row" gap={52}>
        <ImageUploader
          ref={fileRef}
          defaultPreview={imagePreview}
          onFileChange={handleFileChange}
        />
        <Flex direction="column" gap={24} style={{ flex: 1 }}>
          <Input
            label="물품명"
            placeholder="물품명 입력"
            name="name"
            value={form.name}
            onChange={handleFormChange}
          />
          <Input
            label="습득 신고자"
            placeholder="습득 신고자 입력"
            name="reporterName"
            value={form.reporterName}
            onChange={handleFormChange}
          />
          <DateSelector
            placeholderText="습득 날짜 선택"
            selected={form.date}
            onChange={handleDateChange}
            customInput={
              <Input
                label="습득 날짜"
                name="date"
                rightIcon={<IconCalendar width={24} height={24} />}
              />
            }
            dateFormat="yyyy. MM. dd."
            popperPlacement="bottom-end"
          />
          <Input
            label="습득 장소"
            placeholder="습득 장소 입력"
            name="location"
            value={form.location}
            onChange={handleFormChange}
          />
          <InputDropdown
            label="물품 카테고리"
            placeholder="물품 카테고리 선택"
            value={form.category}
            data={CATEGORY}
            onChange={handleDropdownChange}
            name="category"
          />
        </Flex>
      </Flex>
    </StyledEditPage>
  );
};

const StyledEditPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export default EditPage;
