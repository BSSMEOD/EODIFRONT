import { ChangeEvent, useRef, useState } from 'react';
import { CATEGORY } from '@/constants/item/constant';
import { useImageUploadMutation } from '@services/image/mutations';

interface Form {
  name: string;
  reporterName: string;
  reporterStudentCode: number | undefined;
  date: Date | null;
  location: string;
  category: (typeof CATEGORY)[number] | '';
}

export const useForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Form>({
    name: '',
    reporterName: '',
    reporterStudentCode: undefined,
    date: null,
    location: '',
    category: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync: imageUploadMutateAsync } = useImageUploadMutation();

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
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
      !form.reporterName.trim() ||
      !form.reporterStudentCode ||
      !form.date ||
      !form.location.trim() ||
      !form.category;

    if (isFormInvalid) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const imageUrl = await imageUploadMutateAsync(selectedFile);
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
