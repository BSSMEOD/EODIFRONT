import { UserAuthority } from '@/types/user/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

export const useRequireRole = (role: UserAuthority) => {
  const router = useRouter();
  const { authority, isLoggedIn, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      router.replace('/login');
      return;
    }

    if (authority != role) {
      alert('접근할 수 없는 페이지입니다.');
      router.replace('/');
    }
  }, [role, router, authority, isLoggedIn, isInitialized]);
};
