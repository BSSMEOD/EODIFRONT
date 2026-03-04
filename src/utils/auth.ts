import { UserAuthority } from '@/types/user/client';
import { useAuthStore } from '@/stores/useAuthStore';

export const hasPermission = (requiredPermission: UserAuthority) => {
  const { authority, isLoggedIn } = useAuthStore.getState();
  if (!isLoggedIn) {
    return false;
  }

  return authority === requiredPermission;
};
