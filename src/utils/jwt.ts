import { UserAuthority } from '@/types/user/client';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  type: string;
  iat: number;
  exp: number;
}

export const decodeJwt = (token: string): JwtPayload | null => {
  const base64Url = token.split('.')[1];
  if (!base64Url) return null;

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const mapRoleToAuthority = (role: string): UserAuthority => {
  if (role === 'ADMIN' || role === 'MANAGER') {
    return 'ADMIN';
  }
  if (role === 'TEACHER') {
    return 'TEACHER';
  }
  return 'USER';
};
