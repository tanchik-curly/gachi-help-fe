export interface User {
  id: number;
  login: string;
  email: string;
  role: Roles;
  name: string;
  surname: string;
  patronym: string;
  requestedHelp: IState<RequestedHelp>;
}

export enum Roles {
  User = 'User',
  Worker = 'Worker',
  Admin = 'Admin',
}

export interface IState<T> {
  list: {
    itemCount: number;
    items: T[];
  };
  filters?: {
    search?: string;
    dateFrom?: Date;
    dateTo?: Date;
  };
}

export interface Table {
  pagination: Record<string, any>;
  itemsCount: number;
}

export type Status = 'Canceled' | 'Pending' | 'Approved';

export interface RequestedHelp {
  id: number;
  helpCategory: HelpCategory;
  author: Partial<User>;
  status: Status;
  createdAt: Date;
}

export interface HelpCategory {
  id: number;
  name: string;
}

export type Group = 'Approved' | 'Declined';

export interface RequestHelpStatState {
  categories: {
    items: Array<HelpCategory>;
    selectedCategory: HelpCategory | null;
  };
  requestedHelpStat: {
    items: Array<{ group: Group; quantity: number }>;
    filters: {
      dateFrom: string;
      dateTo: string;
    };
  };
}
