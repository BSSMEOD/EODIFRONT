import { ChangeEvent, useRef, useState } from 'react';
import { CATEGORY } from '@/constants/item/constant';

interface Form {
  name: string;
  reporter: string;
  date: Date | null;
  location: string;
  category: (typeof CATEGORY)[number];
}

export const useForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Form>({
    name: '',
    reporter: '',
    date: null,
    location: '',
    category: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleSubmit = () => {
    const isConfirm = confirm('분실물을 등록하시겠습니까?');
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
