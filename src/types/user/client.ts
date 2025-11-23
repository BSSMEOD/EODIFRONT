export type UserAuthority = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  name: string;
  authority: UserAuthority;
}
