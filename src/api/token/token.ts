import { Storage } from '../storage/storage';
import { TOKEN } from '@/constants/common/constants';

const authorization = () => {
  const token = Storage.getItem(TOKEN.ACCESS);
  if (!token) {
    return { headers: {} };
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

authorization.formData = () => {
  const token = Storage.getItem(TOKEN.ACCESS);
  if (!token) {
    return { headers: {} };
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export default authorization;
