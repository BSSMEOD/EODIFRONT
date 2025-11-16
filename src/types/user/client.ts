export type UserAuthority = 'MANAGER' | 'TEACHER' | 'STUDENT';

export interface User {
  name: string;
  authority: UserAuthority;
}
