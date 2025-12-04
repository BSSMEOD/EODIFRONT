import { ChangeEvent, useRef, useState } from 'react';
import { CATEGORY } from '@/constants/product/constant';

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

  const handleFormChange = (value: string | Date | null, name: string) => {
    setForm({ ...form, [name]: value });
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
    handleFileChange,
    clearFile,
    handleSubmit,
  };
};
