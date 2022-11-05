import jwtDecode from 'jwt-decode';

const checkTokenExpiration = (accessToken: string): boolean => {
  const { exp }: { exp: number } = jwtDecode(accessToken);
  const now = new Date().getTime() / 1000;
  return exp - 60 < now;
};

export default checkTokenExpiration;
