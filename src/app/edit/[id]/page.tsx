'use client';

import React from 'react';
import { useEditForm } from '@app/edit/edit.hooks';
import 'react-datepicker/dist/react-datepicker.css';
import ItemFormView from '@components/ItemFormView/ItemFormView';

interface EditPageProps {
  params: Promise<{
    id: number;
  }>;
}

const EditPage = ({ params }: EditPageProps) => {
  const { id } = React.use(params);
  const formState = useEditForm(id);

  return <ItemFormView mode="수정" formState={formState} />;
};

export default EditPage;
