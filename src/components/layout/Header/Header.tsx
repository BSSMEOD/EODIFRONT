'use client';

import styled from '@emotion/styled';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { NavItemList } from '@components/layout/Header/NavItemList/NavItemList';
import { EODILogo, IconHamburger } from '@/icons';
import breakpoint from '@styles/breakpoint';
import { useOverlay } from '@toss/use-overlay';
import { useAuthStore } from '@/stores/useAuthStore';
import Sidebar from './Sidebar/Sidebar';

const Header = () => {
  const router = useRouter();
  const overlay = useOverlay();
  const { isInitialized } = useAuthStore();

  const handleOpenSidebar = () => {
    overlay.open(({ isOpen, close }) => (
      <Sidebar onClose={close} isOpen={isOpen} />
    ));
  };

  return (
    <StyledHeader>
      <LogoWrapper onClick={() => router.push(ROUTES.MAIN)}>
        <EODILogo />
      </LogoWrapper>
      <DesktopNav>
        <NavItemList />
      </DesktopNav>
      {isInitialized && (
        <MenuButton onClick={handleOpenSidebar}>
          <IconHamburger />
        </MenuButton>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 0 180px;
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
  height: 32px;

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

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  align-items: center;
  display: none;

  ${breakpoint.mobile} {
    display: flex;
  }
`;
