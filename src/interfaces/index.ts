export interface User {
  id: number;
  login: string;
  email: string;
  role: Roles;
  passwordHash: string;
  name: string;
  surname: string;
  patronym: string;
}

export enum Roles {
  User = 'User',
  Worker = 'Worker',
  Admin = 'Admin',
}

export interface Table {
  pagination: Record<string, any>;
  itemsCount: number;
}
