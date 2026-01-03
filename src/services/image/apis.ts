import { eodi } from '@/api/instance/instance';
import authorization from '@/api/token/token';

export const postImage = async (formData: FormData) => {
  const { data } = await eodi.post(
    '/images',
    formData,
    authorization.formData()
  );
  return data;
};
