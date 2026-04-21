'use client';

import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { IconClose } from '@/icons';
import { useAuthStore } from '@/stores/useAuthStore';
import { ROUTES } from '@/constants/common/constants';
import color from '@styles/color';
import Text from '@components/common/Text/Text';
import font from '@styles/font';
import Flex from '@components/common/Flex/Flex';
import { UserAuthority } from '@/types/user/client';

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

const PATHS: Record<UserAuthority, Record<string, string>> = {
  USER: {
    홈: ROUTES.MAIN,
    '분실물 찾기': ROUTES.FIND,
  },
  ADMIN: {
    홈: ROUTES.MAIN,
    '분실물 관리': ROUTES.MANAGE,
    '회수 요청 관리': ROUTES.RECALL,
    '분실물 등록하기': ROUTES.REGISTER,
  },
  TEACHER: {
    홈: ROUTES.TEACHER,
  },
};

const Sidebar = ({ onClose, isOpen }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, logout, authority } = useAuthStore();

  const handleNavClick = (route: string) => {
    router.push(route);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.push(ROUTES.MAIN);
      toast.success('로그아웃 되었습니다.');
      onClose();
    }
  };

  const AuthButton = () =>
    isLoggedIn ? (
      <Text variant="p3" color={color.gray500} onClick={handleLogout}>
        로그아웃
      </Text>
    ) : (
      <Text
        variant="p3"
        color={color.gray500}
        onClick={() => handleNavClick(ROUTES.LOGIN)}
      >
        bsm 로그인
      </Text>
    );

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <DrawerWrapper onClick={(e) => e.stopPropagation()}>
        <SidebarHeader>
          <Text variant="H2">메뉴</Text>
          <CloseButton onClick={onClose}>
            <IconClose />
          </CloseButton>
        </SidebarHeader>
        <Flex direction="column" gap={4}>
          {Object.entries(PATHS[authority]).map(([label, route]) => (
            <NavItem
              key={label}
              $active={pathname === route}
              onClick={() => route && handleNavClick(route)}
            >
              {label}
            </NavItem>
          ))}
        </Flex>
        <AuthSection>
          <AuthButton />
        </AuthSection>
      </DrawerWrapper>
    </Overlay>
  );
};

export default Sidebar;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 180px;
  background-color: ${color.white};
  border-left: 8px solid ${color.primary300};
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 20px 0;
  gap: 20px;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const AuthSection = styled.div`
  padding: 0 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
`;

const NavItem = styled.div<{ $active?: boolean }>`
  ${font.p3}
  padding: 4px 20px;
  background-color: ${({ $active }) =>
    $active ? color.primary200 : 'transparent'};
  cursor: pointer;
`;
