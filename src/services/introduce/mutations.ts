import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchIntroduce } from '@services/introduce/apis';

export const useIntroduceMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (content: string) => patchIntroduce({ content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['introduce'] }),
  });

  return { mutate, ...restMutation };
};
