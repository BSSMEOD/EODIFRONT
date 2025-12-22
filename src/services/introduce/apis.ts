import { eodi } from '@/api/instance/instance';
import { GetIntroduceRes, PostIntroduceReq } from '@/types/introduce/remote';

export const getIntroduce = async () => {
  const { data } = await eodi.get<GetIntroduceRes>('/introduce');
  return data;
};

export const patchIntroduce = async (req: PostIntroduceReq) => {
  const { data } = await eodi.patch('/introduce', req);
  return data;
};
