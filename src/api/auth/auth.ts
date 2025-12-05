import axios from 'axios';

interface RefreshTokenResponse {
  accessToken: string;
  tokenType: string;
}
export const refreshAccessToken = async (): Promise<string | null> => {
  const response = await axios.post<RefreshTokenResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
    null,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const newAccessToken = response.data.accessToken;
  return newAccessToken;
};

export const logoutApi = async (accessToken: string | null): Promise<void> => {
  await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, null, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
};
