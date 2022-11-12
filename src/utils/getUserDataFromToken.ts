import { User } from 'interfaces';
import jwtDecode from 'jwt-decode';

export const getUserDataFromToken = (accessToken: string) => {
  if (accessToken) {
    return jwtDecode(accessToken) as User;
  }
  return null;
};
