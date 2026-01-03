import { postImage } from '@services/image/apis';
import { useMutation } from '@tanstack/react-query';

export const useImageUploadMutation = () => {
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (formData: FormData) => postImage(formData),
  });
  return { mutate, ...restMutation };
};
