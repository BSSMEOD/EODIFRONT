export type UserAuthority = 'ADMIN' | 'TEACHER' | 'USER';

export interface User {
  name: string;
  authority: UserAuthority;
}
