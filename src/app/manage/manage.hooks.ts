import { useState } from 'react';

interface Filters {
  search: string;
  category: string;
  time: string;
  location: string;
}

export const useForm = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    time: '',
    location: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDropdownChange = (value: string, name: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return { filters, handleInputChange, handleDropdownChange };
};
