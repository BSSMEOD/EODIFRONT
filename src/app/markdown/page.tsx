'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@components/common/Button/Button';
import { useIntroduceQuery } from '@services/introduce/queries';
import { useIntroduceMutation } from '@services/introduce/mutations';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
});

const MarkdownPage = () => {
  const { data } = useIntroduceQuery();
  const { mutate } = useIntroduceMutation();
  const mdRef = React.useRef<Editor | null>(null);

  const handleMarkdownSubmit = () => {
    const content = mdRef.current?.getInstance().getMarkdown() ?? '';
    mutate(content);
  };

  return (
    <StyledMarkdownPage>
      <EditorContainer>
        {data && <MarkdownEditor ref={mdRef} initialValue={data.content} />}
      </EditorContainer>
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

const EditorContainer = styled.div`
  width: 100%;
`;

export default MarkdownPage;
