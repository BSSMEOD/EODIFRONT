import { ChangeEvent, useRef, useState } from 'react';
import { useImageUploadMutation } from '@services/image/mutations';
import { useItemRegisterMutation } from '@services/item/mutations';
import { ItemForm } from '@/types/item/client';
import { formatDateDash } from '@utils/formatDate';

export const useForm = () => {
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

  const clearFile = () => {
    setSelectedFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    const isConfirm = confirm('분실물을 등록하시겠습니까?');
    if (!isConfirm) return;

    const isFormInvalid =
      !selectedFile ||
      !form.name.trim() ||
      !form.foundAt ||
      !form.placeId ||
      !form.foundPlaceDetail.trim() ||
      !form.category;

    if (isFormInvalid) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const imageUrl = await imageUploadMutateAsync(selectedFile);
    registerItemMutate({ ...form, imageUrl });
  };

  return {
    fileRef,
    form,
    selectedFile,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleFileChange,
    clearFile,
    handleSubmit,
  };
};
