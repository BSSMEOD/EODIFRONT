import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

type ErrorStatus = 403 | 429 | 500;

const ERROR: Record<ErrorStatus, string> = {
  403: '유저의 권한이 없습니다.',
  429: '너무 많이 요청하였습니다. 조금 뒤 다시 이용해주세요.',
  500: '서버에 알 수 없는 오류가 발생하였습니다.',
};

export const useApiError = () => {
  const handleError = (error: unknown) => {
    let errorMessage;
    if (isAxiosError(error) && error.response) {
      const status = error.response.status as ErrorStatus;
      const message = error.response.data?.message;
      errorMessage = message ?? ERROR[status];
    } else {
      errorMessage = '알 수 없는 오류가 발생하였습니다.';
    }
    toast.error(errorMessage);
  };
  return { handleError };
};
