export const ROUTES = {
  MAIN: '/',
  TEACHER: '/teacher',
  FIND: '/find',
  EDIT: '/edit',
  LOGIN: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '/login',
  LOG: '/log',
  POINT: '/point',
  DISPOSAL: '/disposal',
  ADMIN_DISPOSAL: '/admin-disposal',
  DISPOSAL_HISTORY: '/disposal-history',
  MANAGE: '/manage',
  RECALL: '/recall',
  REGISTER: '/register',
  RULES: '/rules',
  MARKDOWN: '/markdown',
  MOBILE_BLOCK: '/mobile-block',
  MYPAGE: '/mypage',
};

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;

export const MOBILE_BLOCK_SIZE = 768;
