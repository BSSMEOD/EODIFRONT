'use client';

import React, { forwardRef } from 'react';
import { Editor } from '@toast-ui/react-editor';

interface MarkdownEditorProps {
  initialValue: string;
}

const MarkdownEditor = forwardRef<Editor, MarkdownEditorProps>(
  ({ initialValue }, ref) => {
    const toolbarItems = [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr'],
      ['ul', 'ol'],
      ['table', 'link'],
    ];

    return (
      <Editor
        ref={ref}
        initialValue={initialValue}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        toolbarItems={toolbarItems}
        useCommandShortcut={false}
        hideModeSwitch
        previewHighlight={false}
      />
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';
export default MarkdownEditor;
