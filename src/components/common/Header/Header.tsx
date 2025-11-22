'use client';

import styled from '@emotion/styled';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { NavItemList } from '@components/common/Header/NavItemList/NavItemList';
import { useAuthStore } from '@/stores/useAuthStore';
import { EODILogo } from '@package/icon';

const Header = () => {
  const { authority } = useAuthStore();
  const router = useRouter();

  return (
    <StyledHeader>
      <div onClick={() => router.push(ROUTES.MAIN)}>
        <EODILogo />
      </div>
      <NavItemList authority={authority} />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 20px 180px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;
