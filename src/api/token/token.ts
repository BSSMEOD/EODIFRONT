import { Storage } from '../storage/storage';
import { TOKEN } from '@/constants/common/constants';

const authorization = () => {
  return {
    headers: {
      Authorization: `Bearer ${Storage.getItem(TOKEN.ACCESS)}`,
    },
  };
};

authorization.FormData = () => {
  return {
    headers: {
      Authorization: `Bearer ${Storage.getItem(TOKEN.ACCESS)}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export default authorization;
