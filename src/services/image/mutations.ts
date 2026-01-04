import { postImage } from '@services/image/apis';
import { useMutation } from '@tanstack/react-query';

export const useImageUploadMutation = () => {
  const { mutate, ...restMutation } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const data = await postImage(formData);
      return data.url as string;
    },
  });
  return { mutate, ...restMutation };
};
