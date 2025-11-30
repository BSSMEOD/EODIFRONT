import styled from '@emotion/styled';
import font from '@styles/font';
import { IconSearch } from '@package/icon';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  placeholder = '분실물의 이름, 잃어버린 위치 등을 검색해 분실물을 찾아보세요.',
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <StyledSearchInput>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <IconSearch />
    </StyledSearchInput>
  );
};

const StyledSearchInput = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 30px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  ${font.p2};
  color: rgba(0, 0, 0, 0.8);
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  letter-spacing: -0.352px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;

export default SearchInput;
