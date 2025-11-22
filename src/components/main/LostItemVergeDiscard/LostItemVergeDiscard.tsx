import styled from '@emotion/styled';
import Text from '@ui/Text/Text';

const LostItemVergeDiscard = () => {
  return (
    <StyledLostItemVergeDiscard>
      <Text variant="H1">폐기 직전인 분실물</Text>
    </StyledLostItemVergeDiscard>
  );
};

export default LostItemVergeDiscard;

const StyledLostItemVergeDiscard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
