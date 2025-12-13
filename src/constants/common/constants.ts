export const ROUTES = {
  MAIN: '/',
  TEACHER: '/teacher',
  FIND: '/find',
  LOGIN: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '/login',
  LOG: '/log',
  POINT: '/point',
  DISPOSAL: '/disposal',
  MANAGE: '/manage',
  RECALL: '/recall',
  REGISTER: '/register',
  RULES: '/rules',
  MARKDOWN: '/markdown',
};

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;
