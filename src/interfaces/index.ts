export interface User {
  id: number;
  login: string;
  email: string;
  role: number;
  passwordHash: string;
  name: string;
  surname: string;
  patronym: string;
}

export interface Table {
  pagination: Record<string, any>;
  itemsCount: number;
}
