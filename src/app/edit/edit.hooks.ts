import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFindDetailQuery, usePlaceListQuery } from '@services/item/queries';
import { useImageUploadMutation } from '@services/image/mutations';
import { useItemUpdateMutation } from '@services/item/mutations';
import { ItemForm } from '@/types/item/client';

export const useForm = (id: number) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: imageUploadMutateAsync } = useImageUploadMutation();
  const { mutate: updateItemMutate } = useItemUpdateMutation(id);

  const [form, setForm] = useState<ItemForm>({
    reporterStudentCode: undefined,
    name: '',
    reporterName: '',
    foundAt: undefined,
    placeId: '',
    foundPlaceDetail: '',
    category: undefined,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();

  const { data: itemData, error, isLoading } = useFindDetailQuery(id);
  const { data: placeListData } = usePlaceListQuery();

  useEffect(() => {
    if (error) {
      alert('분실물을 불러올 수 없습니다.');
      router.back();
    }
  }, [error, router]);

  useEffect(() => {
    if (!itemData || !placeListData) return;
    const foudPlace = placeListData.find(
      (place) => place.name === itemData.foundPlace
    );

    setForm({
      name: itemData.name ?? '',
      reporterStudentCode: itemData.reporterStudentCode,
      reporterName: itemData.reporterName,
      foundAt: itemData.foundAt,
      placeId: foudPlace ? foudPlace.id.toString() : '',
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

  const handleDateChange = (date: Date | null) => {
    const parsedDate = date ? new Date(date) : undefined;
    updateFormField('foundAt', parsedDate);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const isConfirm = confirm('분실물 정보를 수정하시겠습니까?');
    if (!isConfirm) return;
    if (!imagePreview) return;
    const imageUrl = selectedFile
      ? await imageUploadMutateAsync(selectedFile)
      : imagePreview;

    updateItemMutate({ ...form, imageUrl });
  };

  return {
    fileRef,
    form,
    imagePreview,
    selectedFile,
    handleFormChange,
    handleDropdownChange,
    handleDateChange,
    handleFileChange,
    handleSubmit,
    isLoading,
  };
};
