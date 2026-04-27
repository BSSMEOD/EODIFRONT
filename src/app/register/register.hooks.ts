import { ChangeEvent, useRef, useState } from 'react';
import { useImageUploadMutation } from '@services/image/mutations';
import { useItemRegisterMutation } from '@services/item/mutations';
import { usePlaceListQuery } from '@services/item/queries';
import type { ItemForm } from '@/types/item/client';
import { formatDateDash } from '@utils/formatDate';
import { toast } from 'react-toastify';

export const useRegisterForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ItemForm>({
    name: '',
    reporterName: '',
    reporterStudentCode: null,
    foundAt: '',
    placeId: '',
    foundPlaceDetail: '',
    category: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync: imageUploadMutateAsync } = useImageUploadMutation();
  const { mutate: registerItemMutate } = useItemRegisterMutation();
  const { data: placeListData } = usePlaceListQuery();
  const placeOptions =
    placeListData?.map((place) => ({
      label: place.name,
      value: place.id.toString(),
    })) ?? [];

  const updateFormField = <K extends keyof ItemForm>(
    name: K,
    value: ItemForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormField(name as keyof ItemForm, value as ItemForm[keyof ItemForm]);
  };

  const handleDropdownChange = (value: string, name: string) => {
    updateFormField(name as keyof ItemForm, value as ItemForm[keyof ItemForm]);
  };

  const handleDateChange = (
    date: Date | null,
    inputType?: 'year' | 'month' | 'date'
  ) => {
    const parsedDate = date ? formatDateDash(date, inputType) : '';
    updateFormField('foundAt', parsedDate);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const isFormInvalid =
      !selectedFile ||
      !form.name.trim() ||
      !form.foundAt ||
      !form.placeId ||
      !form.foundPlaceDetail.trim() ||
      !form.category;

    if (isFormInvalid) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    const imageUrl = await imageUploadMutateAsync(selectedFile);
    registerItemMutate({ ...form, imageUrl });
  };

  return {
    fileRef,
    form,
    placeOptions,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleFileChange,
    handleSubmit,
  };
};
