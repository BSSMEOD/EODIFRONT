'use client';

import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import styled from '@emotion/styled';
import { Button } from '@components/common/Button/Button';
import ReactMarkdown from 'react-markdown';

const MarkdownPage = () => {
  return (
    <StyledMarkdownPage>
      <MdEditor
        style={{ width: '100%', height: '500px' }}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      />
      <Button styleType="GHOST">저장하기</Button>
    </StyledMarkdownPage>
  );
};

const StyledMarkdownPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export default MarkdownPage;
