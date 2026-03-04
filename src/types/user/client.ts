export type UserAuthority = 'ADMIN' | 'TEACHER' | 'USER';

export interface User {
  email: string;
  authority: UserAuthority;
}
