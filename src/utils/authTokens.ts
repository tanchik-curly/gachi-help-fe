import LocalStorage from './localStorageSingleton';

export const ACCESS_TOKEN = 'access_token';

export const getAccessToken = (): string | null =>
  window.localStorage.getItem(ACCESS_TOKEN);

export const setAccessToken = (token: string): void =>
  LocalStorage.setItem(ACCESS_TOKEN, token);

export const removeAccessToken = (): void =>
  LocalStorage.removeItem(ACCESS_TOKEN);
