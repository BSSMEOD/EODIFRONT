import { eodi } from '@/api/instance/instance';
import authorization from '@/api/token/token';
import type { GetMyClaimsParams, GetMyClaimsRes } from '@/types/mypage/remote';

export const getMyClaims = async (params?: GetMyClaimsParams) => {
  const { data } = await eodi.get<GetMyClaimsRes>('/items/claims/my', {
    ...authorization(),
    params,
  });

  return data;
};

export const cancelMyClaim = async (claimId: number) => {
  const { data } = await eodi.delete(
    `/items/claims/${claimId}`,
    authorization()
  );

  return data;
};
