import { useQuery } from '@tanstack/react-query';
import { getMyClaims } from './apis';
import type { GetMyClaimsParams } from '@/types/mypage/remote';
import { useAuthStore } from '@/stores/useAuthStore';

export const useMyClaimsQuery = (params?: GetMyClaimsParams) => {
  const { authority, isLoggedIn } = useAuthStore();
  const isUser = authority === 'USER' && isLoggedIn;

  const { data, ...restQuery } = useQuery({
    queryKey: ['mypage', 'claims', params],
    queryFn: () => getMyClaims(params),
    enabled: isUser,
    retry: false,
  });

  return { data, ...restQuery };
};
