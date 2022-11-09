export interface User {
  firstName: string;
  lastName: string;
  role: string;
}

export interface Table {
  pagination: Record<string, any>;
  itemsCount: number;
}
