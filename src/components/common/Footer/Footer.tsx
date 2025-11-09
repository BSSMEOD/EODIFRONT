/** @jsxImportSource @emotion/react */
'use client';
import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';

const Footer = () => {
  return (
    <StyledFooter>
      <p css={font.H3}>추가 문의 </p>
      <p css={font.p2}>
        2학년 2반 이하은 ( @han22._x )<br />
        학생자치부 진예빈 / 유근찬 선생님( 전문교무실 )
      </p>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: ${color.white};
  background-color: ${color.black};
  padding: 36px 183px 87px 183px;
  align-items: flex-start;
  margin-top: auto;
`;
