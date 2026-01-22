'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@components/common/Button/Button';
import { useIntroduceQuery } from '@services/introduce/queries';
import { useIntroduceMutation } from '@services/introduce/mutations';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

const MarkdownPage = () => {
  const { data } = useIntroduceQuery();
  const { mutate } = useIntroduceMutation();
  const mdRef = React.useRef<Editor>(null);

  const handleMarkdownSubmit = () => {
    const content = mdRef.current?.getInstance().getMarkdown() || '';
    mutate(content);
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
  ];

  return (
    <StyledMarkdownPage>
      <EditorContainer>
        {data && (
          <Editor
            ref={mdRef}
            initialValue={data.content}
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            toolbarItems={toolbarItems}
            useCommandShortcut={false}
            hideModeSwitch
            previewHighlight={false}
          />
        )}
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
