import { axiosInstance } from 'api';
import { User } from 'interfaces';
import routes from '../../apiRoutes';

export type UsersResponse = {
  items: Array<Partial<User>>;
  itemCount: number;
};

export type UserIdentity = {
  userId: number;
};

export type Filters = {
  skip: number;
  limit: number;
  search?: string;
};

export const users = {
  getUsers({ skip, limit, search }: Filters): Promise<UsersResponse> {
    return axiosInstance.get(
      `${routes.USERS_URL}?skip=${skip}&limit=${limit}${
        search ? `&searchQuery=${search.trim()}` : ''
      }`,
    );
  },
  getUser({ userId }: UserIdentity): Promise<UsersResponse> {
    return axiosInstance.get(`${routes.USERS_URL}/${userId}`);
  },
};
