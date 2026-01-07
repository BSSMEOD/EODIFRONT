'use client';

import { useRegisterForm } from '@app/register/register.hooks';
import 'react-datepicker/dist/react-datepicker.css';
import ItemFormView from '@components/ItemFormView/ItemFormView';

const RegisterPage = () => {
  const formState = useRegisterForm();

  return <ItemFormView mode="등록" formState={formState} />;
};

export default RegisterPage;
