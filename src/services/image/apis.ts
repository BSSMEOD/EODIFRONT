import { eodi } from '@/api/instance/instance';
import authorization from '@/api/token/token';
import { PostImageRes } from '@/types/image/response';

export const postImage = async (formData: FormData) => {
  const { data } = await eodi.post<PostImageRes>(
    '/images',
    formData,
    authorization.formData()
  );
  return data;
};
