import { axiosInstance } from 'api';
import { User } from 'interfaces';
import routes from '../../apiRoutes';

export type AuthResponse = {
  token: string;
  expirationTime: number;
  user: User;
};

export type Credentials = {
  email: string;
  password: string;
};

export const auth = {
  login({ email, password }: Credentials): Promise<AuthResponse> {
    return axiosInstance.post(routes.AUTHORIZATOIN_URL, {
      login: email,
      password,
    });
  },
};
