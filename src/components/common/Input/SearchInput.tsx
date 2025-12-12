import styled from '@emotion/styled';
import font from '@styles/font';
import { IconSearch } from '@/icons';
import { BaseInputProps } from '@components/common/Input/Input.types';
import color from '@styles/color';

type SearchInputProps = BaseInputProps;

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
  border: 1px solid ${color.gray400};
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
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  letter-spacing: -0.352px;

  &::placeholder {
    color: ${color.gray400};
  }
`;

export default SearchInput;
