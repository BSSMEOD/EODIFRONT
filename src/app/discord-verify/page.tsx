'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { getDiscordBsmAuthorizeUrl } from '@/api/auth/auth';
import color from '@styles/color';
import font from '@styles/font';

const DiscordVerifyPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const discordId = params.get('discordId');

    if (!discordId) {
      const message = '잘못된 접근입니다. discordId가 필요합니다.';
      toast.error(message);
      setErrorMessage(message);
      return;
    }

    (async () => {
      try {
        const authorizeUrl = await getDiscordBsmAuthorizeUrl(discordId);
        window.location.href = authorizeUrl;
      } catch {
        const message = 'BSM 인증 페이지로 이동에 실패했습니다.';
        toast.error(message);
        setErrorMessage(message);
      }
    })();
  }, []);

  return (
    <Container>
      <Message>{errorMessage ?? 'BSM 인증 페이지로 이동 중...'}</Message>
    </Container>
  );
};

export default DiscordVerifyPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Message = styled.p`
  ${font.p1}
  color: ${color.black};
`;
