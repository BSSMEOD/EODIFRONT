import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchIntroduce } from '@services/introduce/apis';
import { useApiHandler } from '@hooks/useApiHandler';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';

export const useIntroduceMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleSuccess } = useApiHandler();
  const { mutate, ...restMutation } = useMutation({
    mutationFn: (content: string) => patchIntroduce({ content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['introduce'] });
      handleSuccess('소개글이 수정되었습니다');
      router.push(ROUTES.MAIN);
    },
  });

  return { mutate, ...restMutation };
};
