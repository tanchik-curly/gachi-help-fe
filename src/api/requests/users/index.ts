import { axiosInstance } from 'api';
import { User } from 'interfaces';
import routes from '../../apiRoutes';

export type UserResponse = Partial<User>;

export type UserIdentity = {
  userId: number;
};

export const auth = {
  getUsers(): Promise<UserResponse> {
    return axiosInstance.post(routes.USERS_URL);
  },
  getUser({ userId }: UserIdentity): Promise<UserResponse> {
    return axiosInstance.get(`${routes.USERS_URL}/${userId}`);
  },
};
