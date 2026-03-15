'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import { useAuthStore } from '@/stores/useAuthStore';
import { decodeJwt } from '@/utils/jwt';
import styled from '@emotion/styled';
import { UserAuthority } from '@/types/user/client';
import { toast } from 'react-toastify';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        if (params.has('error')) {
          const errorType = params.get('error');
          const errorMessage =
            params.get('message') || 'OAuth 인증에 실패했습니다.';
          toast.error(decodeURIComponent(errorMessage));
          router.push(ROUTES.LOGIN);
          return;
        }
        const token = params.get('token');

        if (!token) {
          toast.error('토큰을 찾을 수 없습니다. 다시 로그인해주세요.');
          router.push(ROUTES.LOGIN);
          return;
        }

        const payload = decodeJwt(token);
        if (!payload) {
          toast.error('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
          router.push(ROUTES.LOGIN);
          return;
        }

        const authority = payload.role as UserAuthority;
        const userEmail = payload.email || '';
        login(
          {
            email: userEmail,
            authority,
          },
          token
        );

        const returnUrl = sessionStorage.getItem('returnUrl') || ROUTES.MAIN;
        sessionStorage.removeItem('returnUrl');
        router.push(returnUrl);
      } catch (error) {
        router.push(ROUTES.LOGIN);
      }
    };

    handleCallback();
  }, [router, login]);

  return (
    <Container>
      <Message>로그인 처리 중...</Message>
    </Container>
  );
};

export default AuthCallbackPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
`;
