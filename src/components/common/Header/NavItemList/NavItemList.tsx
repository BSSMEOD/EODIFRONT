import styled from '@emotion/styled';
import { Button } from '@components/common/Button/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import { NavItem } from './NavItem/NavItem';
import { useAuthStore } from '@/stores/useAuthStore';

export const NavItemList = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();
  const { authority } = useAuthStore();

  const handleLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.MAIN);
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
        styleType={'SECONDARY'}
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
