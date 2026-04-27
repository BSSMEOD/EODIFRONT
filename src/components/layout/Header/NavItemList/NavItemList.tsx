import styled from '@emotion/styled';
import { Button } from '@components/common/Button/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import { NavItem } from './NavItem/NavItem';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import color from '@styles/color';
import font from '@styles/font';

export const NavItemList = () => {
  const router = useRouter();
  const {
    isLoggedIn,
    logout,
    email,
    authority,
    isInitialized,
    name,
    studentCode,
  } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDown);
    return () => document.removeEventListener('keydown', handleEscapeKeyDown);
  }, []);

  if (!isInitialized) return null;

  const handleLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.push(ROUTES.MAIN);
      toast.success('로그아웃 되었습니다.');
    }
  };

  const getUserDisplayName = () => {
    if (studentCode && name) {
      return `${studentCode} ${name}`;
    }

    if (name) {
      return name;
    }

    return email.split('@')[0];
  };

  const ManagerNav = () => (
    <StyledNavItemsList>
      <NavItem onClick={() => router.push(ROUTES.MANAGE)}>분실물 관리</NavItem>
      <NavItem onClick={() => router.push(ROUTES.RECALL)}>
        회수 요청 관리
      </NavItem>
      <NavItem onClick={() => router.push(ROUTES.ADMIN_DISPOSAL)}>
        폐기 물품 관리
      </NavItem>
      <Button
        styleType="SECONDARY"
        onClick={() => router.push(ROUTES.REGISTER)}
      >
        분실물 등록 하기
      </Button>
      {isLoggedIn ? (
        <Button styleType="PRIMARY" onClick={() => handleLogout()} outlined>
          로그아웃
        </Button>
      ) : (
        <Button styleType="PRIMARY" onClick={() => handleLogin()}>
          bsm 로그인
        </Button>
      )}
    </StyledNavItemsList>
  );

  const TeacherNav = () => (
    <StyledNavItemsList>
      <NavItem onClick={() => router.push(ROUTES.LOG)}>지급 내역 보기</NavItem>
      <NavItem onClick={() => router.push(ROUTES.POINT)}>
        상점 처리 하기
      </NavItem>
      <NavItem onClick={() => router.push(ROUTES.DISPOSAL)}>
        폐기 항목 보기
      </NavItem>
      {isLoggedIn ? (
        <Button styleType="PRIMARY" onClick={() => handleLogout()} outlined>
          로그아웃
        </Button>
      ) : (
        <Button styleType="PRIMARY" onClick={() => handleLogin()}>
          bsm 로그인
        </Button>
      )}
    </StyledNavItemsList>
  );

  const UserNav = () => (
    <StyledNavItemsList>
      <NavItem onClick={() => router.push(ROUTES.FIND)}>분실물 찾기</NavItem>
      {isLoggedIn ? (
        <UserDropdownContainer ref={dropdownRef}>
          <UserInfo
            type="button"
            aria-haspopup="menu"
            aria-expanded={showDropdown}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {getUserDisplayName()}
          </UserInfo>
          {showDropdown && (
            <DropdownMenu role="menu">
              <DropdownItem
                type="button"
                role="menuitem"
                onClick={() => {
                  router.push(ROUTES.MYPAGE);
                  setShowDropdown(false);
                }}
              >
                회수 요청 내역
              </DropdownItem>
              <DropdownItem
                type="button"
                role="menuitem"
                onClick={() => {
                  handleLogout();
                  setShowDropdown(false);
                }}
              >
                로그아웃
              </DropdownItem>
            </DropdownMenu>
          )}
        </UserDropdownContainer>
      ) : (
        <Button styleType="PRIMARY" onClick={() => handleLogin()}>
          bsm 로그인
        </Button>
      )}
    </StyledNavItemsList>
  );

  if (authority === 'ADMIN') return <ManagerNav />;
  else if (authority === 'TEACHER') return <TeacherNav />;
  return <UserNav />;
};

const StyledNavItemsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const UserDropdownContainer = styled.div`
  position: relative;
`;

const UserInfo = styled.button`
  ${font.p3};
  color: ${color.gray500};
  cursor: pointer;
  box-sizing: border-box;
  display: block;
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${color.gray100};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${color.white};
  border-radius: 8px;
  box-shadow:
    -4px -4px 4px 0px rgba(0, 0, 0, 0.05),
    4px 4px 4px 0px rgba(0, 0, 0, 0.05);
  min-width: 140px;
  white-space: nowrap;
  z-index: 1000;
  margin-top: 4px;
`;

const DropdownItem = styled.button`
  ${font.p3};
  box-sizing: border-box;
  display: block;
  padding: 12px 16px;
  cursor: pointer;
  color: ${color.black};
  text-align: center;
  width: 100%;
  border: none;
  background: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${color.gray100};
  }

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }
`;
