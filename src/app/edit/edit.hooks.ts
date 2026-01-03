import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY } from '@/constants/item/constant';
import { useFindDetailQuery } from '@services/item/queries';
import { useImageUploadMutation } from '@services/image/mutations';
import { useItemUpdateMutation } from '@services/item/mutations';

interface Form {
  name: string;
  reporterName: string;
  reporterStudentCode: number | undefined;
  date: Date | null;
  location: string;
  category: (typeof CATEGORY)[number] | undefined;
}

export const useForm = (id: number) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: imageUploadMutateAsync } = useImageUploadMutation();
  const { mutate: updateItemMutate } = useItemUpdateMutation(id);

  const [form, setForm] = useState<Form>({
    reporterStudentCode: undefined,
    name: '',
    reporterName: '',
    date: null,
    location: '',
    category: undefined,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();

  const { data: itemData, error, isLoading } = useFindDetailQuery(id);

  useEffect(() => {
    if (error) {
      alert('분실물을 불러올 수 없습니다.');
      router.back();
    }
  }, [error, router]);

  useEffect(() => {
    if (!itemData) return;

    setForm({
      name: itemData.name ?? '',
      reporterStudentCode: itemData.reporterStudentCode,
      reporterName: itemData.reporterName,
      date: itemData.foundAt ? new Date(itemData.foundAt) : null,
      location: itemData.foundPlaceDetail || itemData.foundPlace || '',
      category: itemData.category,
    });
    setImagePreview(itemData.imageUrl);
  }, [itemData]);

  const updateFormField = <K extends keyof Form>(name: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormField(name as keyof Form, value as Form[keyof Form]);
  };

  const handleDropdownChange = (value: string, name: string) => {
    updateFormField(name as keyof Form, value as Form[keyof Form]);
  };

  const handleDateChange = (date: Date | string | null) => {
    const parsedDate =
      typeof date === 'string' ? new Date(date) : (date as Date | null);
    updateFormField('date', parsedDate);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const data = await imageUploadMutateAsync(formData);
    return data.url;
  };

  const handleSubmit = async () => {
    const isConfirm = confirm('분실물 정보를 수정하시겠습니까?');
    if (!isConfirm) return;
    let imageUrl;

    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    } else {
      imageUrl = imagePreview;
    }

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
