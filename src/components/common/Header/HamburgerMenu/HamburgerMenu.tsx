'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { IconClose, IconHamburger } from '@/icons';
import { useAuthStore } from '@/stores/useAuthStore';
import { ROUTES } from '@/constants/common/constants';
import { Button } from '@components/common/Button/Button';
import { NavItem } from '../NavItemList/NavItem/NavItem';
import color from '@styles/color';
import breakpoint from '@styles/breakpoint';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn, logout, authority, isInitialized } = useAuthStore();

  if (!isInitialized) return null;

  const handleNavClick = (route: string) => {
    router.push(route);
    setIsOpen(false);
  };

  const handleLogin = () => handleNavClick(ROUTES.LOGIN);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.push(ROUTES.MAIN);
      toast.success('로그아웃 되었습니다.');
      setIsOpen(false);
    }
  };

  const AuthButton = () =>
    isLoggedIn ? (
      <Button styleType="PRIMARY" onClick={handleLogout} outlined width="100%">
        로그아웃
      </Button>
    ) : (
      <Button styleType="PRIMARY" onClick={handleLogin} width="100%">
        bsm 로그인
      </Button>
    );

  const ManagerItems = () => (
    <>
      <NavItem onClick={() => handleNavClick(ROUTES.MANAGE)}>
        분실물 관리
      </NavItem>
      <NavItem onClick={() => handleNavClick(ROUTES.RECALL)}>
        회수 요청 관리
      </NavItem>
      <NavItem onClick={() => handleNavClick(ROUTES.ADMIN_DISPOSAL)}>
        폐기 물품 관리
      </NavItem>
      <Button
        styleType="SECONDARY"
        onClick={() => handleNavClick(ROUTES.REGISTER)}
        width="100%"
      >
        분실물 등록 하기
      </Button>
    </>
  );

  const TeacherItems = () => (
    <>
      <NavItem onClick={() => handleNavClick(ROUTES.LOG)}>
        지급 내역 보기
      </NavItem>
      <NavItem onClick={() => handleNavClick(ROUTES.POINT)}>
        상점 처리 하기
      </NavItem>
      <NavItem onClick={() => handleNavClick(ROUTES.DISPOSAL)}>
        폐기 항목 보기
      </NavItem>
    </>
  );

  const UserItems = () => (
    <NavItem onClick={() => handleNavClick(ROUTES.FIND)}>분실물 찾기</NavItem>
  );

  return (
    <>
      <IconButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <IconClose /> : <IconHamburger />}
      </IconButton>

      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          <Drawer>
            {authority === 'ADMIN' && <ManagerItems />}
            {authority === 'TEACHER' && <TeacherItems />}
            {authority === 'USER' && <UserItems />}
            <AuthButton />
          </Drawer>
        </>
      )}
    </>
  );
};

const IconButton = styled.button`
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  top: 56px;
  z-index: 99;
`;

const Drawer = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  background-color: ${color.white};
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
`;
