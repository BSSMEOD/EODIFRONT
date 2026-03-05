import styled from '@emotion/styled';
import color from '@styles/color';
import font from '@styles/font';

const Footer = () => {
  return (
    <StyledFooter>
      <p css={font.H3}>추가 문의 </p>
      <p css={font.p2}>
        <a
          href="https://www.instagram.com/han22._x"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램 프로필(새 탭에서 열림)"
        >
          2학년 2반 이하은 ( @han22._x )
        </a>
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
  margin-top: 100px;
`;
