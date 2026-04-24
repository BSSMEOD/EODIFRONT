import { UserAuthority } from '@/types/user/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { ROUTES } from '@/constants/common/constants';
import { toast } from 'react-toastify';

export const useRequireRole = (role: UserAuthority) => {
  const router = useRouter();
  const { authority, isLoggedIn, isInitialized, isLogoutRedirecting } =
    useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isLoggedIn && isLogoutRedirecting) {
      router.replace(ROUTES.MAIN);
      return;
    }

    if (!isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (authority !== role) {
      toast.error('접근할 수 없는 페이지입니다.');
      router.replace(ROUTES.MAIN);
    }
  }, [role, router, authority, isLoggedIn, isInitialized, isLogoutRedirecting]);
};
