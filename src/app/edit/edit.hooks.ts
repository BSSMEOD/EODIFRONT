import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFindDetailQuery, usePlaceListQuery } from '@services/item/queries';
import { useImageUploadMutation } from '@services/image/mutations';
import { useItemUpdateMutation } from '@services/item/mutations';
import type { ItemForm } from '@/types/item/client';
import { formatDateDash } from '@utils/formatDate';
import { toast } from 'react-toastify';

export const useEditForm = (id: number) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: imageUploadMutateAsync } = useImageUploadMutation();
  const { mutate: updateItemMutate } = useItemUpdateMutation(id);

  const [form, setForm] = useState<ItemForm>({
    reporterStudentCode: null,
    name: '',
    reporterName: '',
    foundAt: '',
    placeId: '',
    foundPlaceDetail: '',
    category: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();

  const { data: itemData, error } = useFindDetailQuery(id);
  const { data: placeListData } = usePlaceListQuery();
  const placeOptions =
    placeListData?.map((place) => ({
      label: place.name,
      value: place.id.toString(),
    })) ?? [];

  useEffect(() => {
    if (error) {
      toast.error('분실물을 불러올 수 없습니다.');
      router.back();
    }
  }, [error, router]);

  useEffect(() => {
    if (!itemData || !placeListData) return;
    const foundPlace = placeListData.find(
      (place) => place.name === itemData.foundPlace
    );

    setForm({
      name: itemData.name ?? '',
      reporterStudentCode: itemData.reporterStudentCode,
      reporterName: itemData.reporterName,
      foundAt: itemData.foundAt,
      placeId: foundPlace ? foundPlace.id.toString() : '',
      foundPlaceDetail: itemData.foundPlaceDetail,
      category: itemData.category,
    });
    setImagePreview(itemData.imageUrl);
  }, [itemData, placeListData]);

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
    const hasImage = !!(selectedFile || imagePreview);
    const isFormInvalid =
      !hasImage ||
      !form.name.trim() ||
      !form.foundAt ||
      !form.placeId ||
      !form.foundPlaceDetail.trim() ||
      !form.category;

    if (isFormInvalid) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    const imageUrl = selectedFile
      ? await imageUploadMutateAsync(selectedFile)
      : imagePreview;

    if (!imageUrl) return;

    updateItemMutate({ ...form, imageUrl });
  };

  return {
    fileRef,
    form,
    imagePreview,
    placeOptions,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleFileChange,
    handleSubmit,
  };
};
