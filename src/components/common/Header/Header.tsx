'use client';

import styled from '@emotion/styled';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { NavItemList } from '@components/common/Header/NavItemList/NavItemList';
import { HamburgerMenu } from '@components/common/Header/HamburgerMenu/HamburgerMenu';
import { EODILogo } from '@/icons';
import breakpoint from '@styles/breakpoint';

const Header = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <LogoWrapper onClick={() => router.push(ROUTES.MAIN)}>
        <EODILogo />
      </LogoWrapper>
      <DesktopNav>
        <NavItemList />
      </DesktopNav>
      <HamburgerMenu />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 20px 180px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  ${breakpoint.mobile} {
    height: 56px;
    padding: 0 20px;
  }
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  height: 36px;

  ${breakpoint.mobile} {
    svg {
      height: 32px;
      width: auto;
    }
  }
`;

const DesktopNav = styled.div`
  ${breakpoint.mobile} {
    display: none;
  }
`;
