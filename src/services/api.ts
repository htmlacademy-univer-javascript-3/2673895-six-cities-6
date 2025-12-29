import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const TOKEN_KEY_NAME = 'six-cities-token';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};

let storeRef: { dispatch: (action: unknown) => void } | null = null;

export const setStore = (store: { dispatch: (action: unknown) => void }) => {
  storeRef = store;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 401) {
          dropToken();
          if (storeRef) {
            // Use dynamic import to avoid circular dependency
            void import('../store/actions').then(({ requireAuthorization }) => {
              storeRef?.dispatch(requireAuthorization('NO_AUTH'));
            });
          }
        }
      }

      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
  );

  return api;
};

