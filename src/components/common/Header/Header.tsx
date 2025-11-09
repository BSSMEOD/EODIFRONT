/** @jsxImportSource @emotion/react */
'use client';
import { useUserStore } from '@/stores';
import styled from '@emotion/styled';
import { ROUTES } from '@/constants/common/constants';
import EODILogo from '../../../../packages/icon/src/EODILogo';
import { Button } from '@ui/Button';

const ManagerHeader = () => {
  const { isLoggedIn, login, logout } = useUserStore();

  return (
    <StyledHeader>
      <div
        onClick={() => (window.location.href = ROUTES.MAIN)}
        style={{ cursor: 'pointer' }}
      >
        <EODILogo />
      </div>
      <SortHeaderNavigation>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.MANAGE)}
        >
          분실물 관리
        </Button>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.RECALL)}
        >
          회수 요청 관리
        </Button>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.DISPOSAL)}
        >
          폐기 물품 관리
        </Button>
        <Button
          styleType={'SECONDARY'}
          onClick={() => (window.location.href = ROUTES.REGISTER)}
        >
          분실물 등록 하기
        </Button>
        {isLoggedIn ? (
          <Button styleType={'DISABLED'} onClick={() => logout()}>
            로그아웃
          </Button>
        ) : (
          <Button
            styleType={'PRIMARY'}
            onClick={() => login('관리자', 'MANAGER')}
          >
            로그인
          </Button>
        )}
      </SortHeaderNavigation>
    </StyledHeader>
  );
};

const TeacherHeader = () => {
  const { isLoggedIn, login, logout } = useUserStore();

  return (
    <StyledHeader>
      <div
        onClick={() => (window.location.href = ROUTES.MAIN)}
        style={{ cursor: 'pointer' }}
      >
        <EODILogo />
      </div>
      <SortHeaderNavigation>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.LOG)}
        >
          지급 내역 보기
        </Button>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.POINT)}
        >
          상점 처리 하기
        </Button>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.DISPOSAL)}
        >
          폐기 항목 보기
        </Button>
        {isLoggedIn ? (
          <Button styleType={'DISABLED'} onClick={() => logout()}>
            로그아웃
          </Button>
        ) : (
          <Button
            styleType={'PRIMARY'}
            onClick={() => login('선생님', 'TEACHER')}
          >
            로그인
          </Button>
        )}
      </SortHeaderNavigation>
    </StyledHeader>
  );
};

const StudentHeader = () => {
  const { isLoggedIn, logout } = useUserStore();

  return (
    <StyledHeader>
      <div
        onClick={() => (window.location.href = ROUTES.MAIN)}
        style={{ cursor: 'pointer' }}
      >
        <EODILogo />
      </div>
      <SortHeaderNavigation>
        <Button
          styleType={'TERTIARY'}
          onClick={() => (window.location.href = ROUTES.FIND)}
        >
          분실물 찾기
        </Button>
        {isLoggedIn ? (
          <Button styleType={'DISABLED'} onClick={() => logout()}>
            로그아웃
          </Button>
        ) : (
          <Button
            styleType={'PRIMARY'}
            onClick={() => (window.location.href = ROUTES.LOGIN)}
          >
            로그인
          </Button>
        )}
      </SortHeaderNavigation>
    </StyledHeader>
  );
};

const Header = () => {
  const { authority } = useUserStore();

  return (
    <header>
      {authority === 'MANAGER' && <ManagerHeader />}
      {authority === 'TEACHER' && <TeacherHeader />}
      {authority === 'STUDENT' && <StudentHeader />}
    </header>
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

const SortHeaderNavigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`;
