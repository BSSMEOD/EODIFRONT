'use client';

import React, { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import styled from '@emotion/styled';
import { Button } from '@components/common/Button/Button';
import ReactMarkdown from 'react-markdown';
import { useIntroduceQuery } from '@services/introduce/queries';
import { useIntroduceMutation } from '@services/introduce/mutations';

const MarkdownPage = () => {
  const { data } = useIntroduceQuery();
  const [markdownText, setMarkdownText] = useState<string>('');
  const { mutate } = useIntroduceMutation();

  useEffect(() => {
    setMarkdownText(data?.content || '');
  }, [data]);

  const handleMarkdownChange = (data: { text: string; html: string }) => {
    setMarkdownText(data.text);
  };

  const handleMarkdownSubmit = () => {
    mutate(markdownText);
  };

  return (
    <StyledMarkdownPage>
      <MdEditor
        value={markdownText}
        style={{ width: '100%', height: '500px' }}
        renderHTML={(text) => (
          <ReactMarkdown>{text.replace(/\n/g, '\n\n')}</ReactMarkdown>
        )}
        onChange={handleMarkdownChange}
      />
      <Button styleType="GHOST" onClick={handleMarkdownSubmit}>
        저장하기
      </Button>
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
