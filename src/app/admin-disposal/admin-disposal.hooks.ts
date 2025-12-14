import { useState } from 'react';
import { format } from 'date-fns';
import { Item } from '@/types/item/client';
import { CATEGORY } from '@/constants/item/constant';

interface DisposalItem extends Item {
  daysToDisposal: number;
}

export const useAdminDisposal = (mockDisposalItems: DisposalItem[]) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    disposalDate: '',
    category: '',
    time: '',
    location: '',
  });

  const [isDisposalModalOpen, setIsDisposalModalOpen] = useState(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DisposalItem | null>(null);

  const handleDropdownChange = (name: string) => (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const dateStr = `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'yyyy.MM.dd')}`;
      setFilters((prev) => ({ ...prev, date: dateStr }));
    } else {
      setFilters((prev) => ({ ...prev, date: '' }));
    }
  };

  const handleRemoveFilter = (name: string) => {
    setFilters((prev) => ({ ...prev, [name]: '' }));
    if (name === 'date') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleDisposalHistory = () => {
    window.location.href = '/disposal-history';
  };

  const handleDisposal = (id: number) => {
    const item = mockDisposalItems.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setIsDisposalModalOpen(true);
    }
  };

  const handleExtension = (id: number) => {
    const item = mockDisposalItems.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setIsExtensionModalOpen(true);
    }
  };

  const handleDisposalConfirm = (id: number, reason: string) => {
    console.log('폐기처리:', id, '사유:', reason);
    setIsDisposalModalOpen(false);
    setSelectedItem(null);
  };

  const handleExtensionConfirm = (
    id: number,
    extensionDays: number,
    reason: string
  ) => {
    console.log('기간연장:', id, '일수:', extensionDays, '사유:', reason);
    setIsExtensionModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseModals = () => {
    setIsDisposalModalOpen(false);
    setIsExtensionModalOpen(false);
    setSelectedItem(null);
  };

  const disposalDateOptions = [
    { label: '빠른순', value: 'fastest' },
    { label: '느린순', value: 'slowest' },
  ];

  const categoryOptions = CATEGORY.map((category) => ({
    label: category,
    value: category,
  }));

  const locationOptions = [
    { label: '전체', value: '' },
    { label: '운동장', value: 'playground' },
    { label: '도서관', value: 'library' },
    { label: 'SRC', value: 'src' },
  ];

  return {
    filters: {
      startDate,
      endDate,
      filters,
      handleDropdownChange,
      handleDateChange,
      handleRemoveFilter,
      handleDisposalHistory,
    },
    options: {
      disposalDateOptions,
      categoryOptions,
      locationOptions,
    },
    modals: {
      isDisposalModalOpen,
      isExtensionModalOpen,
      selectedItem,
      handleDisposal,
      handleExtension,
      handleDisposalConfirm,
      handleExtensionConfirm,
      handleCloseModals,
    },
  };
};
