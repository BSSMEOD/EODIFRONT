import styled from '@emotion/styled';
import color from '@styles/color';
import React, { LegacyRef, useState } from 'react';
import Image from 'next/image';
import Flex from '@ui/Flex/Flex';
import Text from '@ui/Text/Text';
import { UploadFile } from '@package/icon';

interface ImageUploaderProps {
  ref: LegacyRef<HTMLInputElement>;
}

const ImageUploader = ({ ref }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  return (
    <StyledImageUploader hasPreview={!!preview}>
      <HiddenInput
        type="file"
        ref={ref}
        onChange={handleImageChange}
        accept="image/*"
      />
      {!!preview ? (
        <PreviewImage src={preview} alt="제품 이미지" fill />
      ) : (
        <Flex direction="column" gap={15}>
          <UploadFile />
          <Text variant="p2">
            파일을 선택하거나 <br />
            여기로 끌어다 놓으세요
          </Text>
        </Flex>
      )}
    </StyledImageUploader>
  );
};

const StyledImageUploader = styled.label<{ hasPreview: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 375px;
  height: 375px;
  border: 1px ${({ hasPreview }) => (hasPreview ? 'solid' : 'dashed')}
    ${color.gray300};
  background: ${color.gray100};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;

  &:hover {
    border-color: ${color.gray400};
    background: ${color.gray200};
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const PreviewImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`;

export default ImageUploader;
