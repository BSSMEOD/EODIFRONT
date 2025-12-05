'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constants';
import { useAuthStore } from '@/stores/useAuthStore';
import { decodeJwt, mapRoleToAuthority } from '@/utils/jwt';
import styled from '@emotion/styled';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = window.location.hash;
        const params = new URLSearchParams(
          hash.startsWith('#') ? hash.substring(1) : hash
        );
        const token = params.get('token');

        if (!token) {
          alert('토큰을 찾을 수 없습니다. 다시 로그인해주세요.');
          router.push(ROUTES.LOGIN);
          return;
        }

        const payload = decodeJwt(token);
        if (!payload) {
          alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
          router.push(ROUTES.LOGIN);
          return;
        }

        const authority = mapRoleToAuthority(payload.role);
        const userEmail = payload.email || '';
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/callback`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          alert('로그인에 실패했습니다. 다시 로그인해주세요.');
          router.push(ROUTES.LOGIN);
          return;
        }

        login(
          {
            name: userEmail.split('@')[0] || '사용자',
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
