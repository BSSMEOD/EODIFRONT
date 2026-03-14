import { ChangeEvent, RefObject, useEffect } from 'react';
import { useState } from 'react';

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
import type { ItemForm } from '@/types/item/client';
import { useBooleanState } from '@hooks/useBooleanState';
import type { Data } from '@components/common/Dropdown/Dropdown.types';
import { getStringFormat } from '@/utils';

type ItemFormState = {
  fileRef: RefObject<HTMLInputElement>;
  form: ItemForm;
  imagePreview?: string;
  placeOptions: Data[];
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDropdownChange: (value: string, name: string) => void;
  handleDateChange: (
    date: Date | null,
    inputType?: 'year' | 'month' | 'date'
  ) => void;
  handleFileChange: (file: File | null) => void;
  handleSubmit: () => void;
};

type ItemFormViewProps = {
  mode: string;
  formState: ItemFormState;
};

const steps = ['year', 'month', 'date'] as const;

const ItemFormView = ({ mode, formState }: ItemFormViewProps) => {
  const {
    fileRef,
    form,
    imagePreview,
    placeOptions,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleFileChange,
    handleSubmit,
  } = formState;
  const [nextStepIndex, setNextStepIndex] = useState<number>(0);
  const {
    value: isDateOpen,
    setTrue: setDateOpen,
    setFalse: setDateClose,
  } = useBooleanState(false);

  const handleStepDateChange = (date: Date | null) => {
    handleDateChange(date, steps[nextStepIndex]);
  };

  const handleDateInputClick = () => {
    setDateOpen();
    setNextStepIndex(0);
    handleDateChange(null);
  };

  useEffect(() => {
    if (!form.foundAt) {
      setNextStepIndex(0);
      return;
    }
    const format = getStringFormat(form.foundAt);
    const currentStepIndex = steps.indexOf(format);

    setNextStepIndex((currentStepIndex + 1) % steps.length);

    if (format === 'date') {
      setDateClose();
    }
  }, [form.foundAt, steps, getStringFormat, setDateClose]);

  return (
    <StyledItemForm>
      <Flex direction="row" justify="space-between" align="center">
        <Text variant="H2">분실물 {mode}하기</Text>
        <Button styleType="SECONDARY" onClick={handleSubmit}>
          {mode}
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
          <Flex direction="row" gap={24}>
            <Input
              type="number"
              label="습득 신고자 학번(선택)"
              placeholder="습득 신고자 학번 입력"
              name="reporterStudentCode"
              value={form.reporterStudentCode ?? ''}
              onChange={handleFormChange}
            />
            <Input
              label="습득 신고자 이름(선택)"
              placeholder="습득 신고자 이름 입력"
              name="reporterName"
              value={form.reporterName ?? ''}
              onChange={handleFormChange}
            />
          </Flex>
          <DateSelector
            placeholderText="습득 날짜 선택"
            selected={form.foundAt ? new Date(form.foundAt) : null}
            onChange={handleStepDateChange}
            showYearPicker={steps[nextStepIndex] === 'year'}
            showMonthYearPicker={steps[nextStepIndex] === 'month'}
            showPopperArrow={false}
            dateFormat={
              steps[nextStepIndex] === 'month'
                ? 'yyyy년'
                : steps[nextStepIndex] === 'date'
                  ? 'yyyy년 MM월'
                  : 'yyyy년 MM월 dd일'
            }
            open={isDateOpen}
            shouldCloseOnSelect={false}
            onInputClick={handleDateInputClick}
            popperPlacement="bottom-end"
            onCalendarClose={setDateClose}
            customInput={
              <Input
                label="습득 날짜"
                name="date"
                rightIcon={<IconCalendar width={24} height={24} />}
              />
            }
          />
          <Flex direction="row" gap={24}>
            <InputDropdown
              data={placeOptions}
              label="습득 장소"
              placeholder="습득 장소 선택"
              value={form.placeId}
              name="placeId"
              onChange={handleDropdownChange}
            />
            <Input
              label="습득 장소 상세"
              placeholder="습득 상세 입력"
              value={form.foundPlaceDetail}
              name="foundPlaceDetail"
              onChange={handleFormChange}
            />
          </Flex>
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
    </StyledItemForm>
  );
};

const StyledItemForm = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export default ItemFormView;
