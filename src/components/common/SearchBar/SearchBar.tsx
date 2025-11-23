'use client';

import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@styles/color';
import IconSearch from '@package/icon/src/IconSearch';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = '분실물의 이름, 잃어버린 위치 등을 검색해 분실물을 찾아보세요.',
  onSearch,
  className,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledSearchBar className={className}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <SearchIconButton onClick={handleSearch}>
        <IconSearch />
      </SearchIconButton>
    </StyledSearchBar>
  );
};

export default SearchBar;

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 30px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  background-color: ${color.white};
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: ${color.black};
  background: transparent;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    letter-spacing: -0.352px;
  }
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
