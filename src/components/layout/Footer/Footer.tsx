import styled from '@emotion/styled';
import color from '@styles/color';
import breakpoint from '@styles/breakpoint';
import { EODILogo } from '@/icons/src/EODILogo';
import { IconOpenInNew } from '@/icons/src/IconOpenInNew';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <Flex direction="column" gap={20}>
          <ResponsiveRow>
            <LogoWrapper>
              <EODILogo textColor={color.white} />
            </LogoWrapper>
            <RightSection>
              <StaffFlex>
                <Flex align="center" gap={10}>
                  <Text variant="H3" color={color.white}>
                    생활부
                  </Text>
                  <Text variant="p2" color={color.white}>
                    3-1 박가은, 2-1 김가은
                  </Text>
                </Flex>
                <Flex align="center" gap={10}>
                  <Text variant="H3" color={color.white}>
                    관리자
                  </Text>
                  <Text variant="p2" color={color.white}>
                    3-1 이하은
                  </Text>
                </Flex>
                <Flex align="center" gap={10}>
                  <Text variant="H3" color={color.white}>
                    학생기숙사부
                  </Text>
                  <Text variant="p2" color={color.white}>
                    진예빈, 송지훈 선생님
                  </Text>
                </Flex>
              </StaffFlex>
              <Divider />
              <Flex align="center" gap={10}>
                <Text variant="H3" color={color.white}>
                  오류 제보
                </Text>
                <ContactLink
                  href="https://open.kakao.com/o/sDjKMAli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Flex align="center" gap={4}>
                    <Text variant="p2" color={color.white}>
                      1:1 오픈채팅
                    </Text>
                    <IconOpenInNew width={20} height={20} />
                  </Flex>
                </ContactLink>
              </Flex>
            </RightSection>
          </ResponsiveRow>
          <Flex justify="center" align="center" width="100%">
            <Text variant="p3" color={color.gray400}>
              Copyright © 2026 EODI. All rights reserved.
            </Text>
          </Flex>
        </Flex>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  color: ${color.white};
  background-color: ${color.black};
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  box-sizing: border-box;
  padding: 25px 0;
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 0 180px;

  @media (max-width: 1200px) {
    padding: 0 80px;
  }

  ${breakpoint.mobile} {
    padding: 0 20px;
  }
`;

const ResponsiveRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${breakpoint.mobile} {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  ${breakpoint.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const ContactLink = styled.a`
  color: ${color.white};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoWrapper = styled.div`
  svg {
    height: 48px;
  }

  ${breakpoint.mobile} {
    svg {
      height: 32px;
    }
  }
`;

const StaffFlex = styled.div`
  display: flex;
  gap: 20px;

  ${breakpoint.mobile} {
    flex-direction: column;
    gap: 4px;
  }
`;

const Divider = styled.span`
  width: 3px;
  height: 20px;
  background-color: ${color.white};
  border-radius: 10px;

  ${breakpoint.mobile} {
    display: none;
  }
`;
