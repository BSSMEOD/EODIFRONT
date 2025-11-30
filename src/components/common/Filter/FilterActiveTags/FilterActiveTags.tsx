import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';
import IconMinus from '@package/icon/src/IconMinus';

interface FilterActiveTagsProps {
  filters: Record<string, string>;
  onRemove: (key: string) => void;
}

const FilterActiveTags = ({ filters, onRemove }: FilterActiveTagsProps) => {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value !== ''
  );

  if (activeFilters.length === 0) return null;

  return (
    <>
      {activeFilters.map(([key, value]) => (
        <FilterTag key={key}>
          <span>{value}</span>
          <RemoveButton onClick={() => onRemove(key)}>
            <IconMinus width={10} color={color.white} />
          </RemoveButton>
        </FilterTag>
      ))}
    </>
  );
};

export default FilterActiveTags;

const FilterTag = styled.div`
  ${font.p3}
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background-color: ${color.secondary};
  color: ${color.white};
  border-radius: 20px;

  span {
    white-space: nowrap;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
