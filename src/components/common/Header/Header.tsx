'use client';

import styled from '@emotion/styled';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { NavItemList } from '@components/common/Header/NavItemList/NavItemList';
import { EODILogo } from '@/icons';

const Header = () => {
  const router = useRouter();

  return (
    <StyledHeader>
      <LogoWrapper onClick={() => router.push(ROUTES.MAIN)}>
        <EODILogo />
      </LogoWrapper>
      <NavItemList />
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
`;
const LogoWrapper = styled.div`
  cursor: pointer;
`;
