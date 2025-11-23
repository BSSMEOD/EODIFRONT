'use client';

import styled from '@emotion/styled';
import { useRef } from 'react';
import ImageUploader from '@components/register/ImageUploader/ImageUploader';

const ResisterPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <StyledResisterPage>
      <ImageUploader ref={fileRef} />
    </StyledResisterPage>
  );
};

const StyledResisterPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export default ResisterPage;
