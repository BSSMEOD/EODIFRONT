import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchIntroduce } from '@services/introduce/apis';
import { useApiHandler } from '@hooks/useApiHandler';

export const useIntroduceMutation = () => {
  const queryClient = useQueryClient();
  const { handleSuccess } = useApiHandler();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (content: string) => patchIntroduce({ content }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['introduce'] });
      handleSuccess('소개글이 수정되었습니다');
    },
  });

  return { mutate, ...restMutation };
};
