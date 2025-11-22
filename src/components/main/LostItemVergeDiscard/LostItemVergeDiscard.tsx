import styled from '@emotion/styled';
import font from '@styles/font';

const LostItemVergeDiscard = () => {
  return (
    <StyledLostItemVergeDiscard>
      <p css={font.H1}>폐기 직전인 분실물</p>
    </StyledLostItemVergeDiscard>
  );
};

export default LostItemVergeDiscard;

const StyledLostItemVergeDiscard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
