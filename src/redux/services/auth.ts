import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credentials, LoginRequest } from '../../types/auth';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// prev version
// export const authApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${import.meta.env.VITE_AUTH_URL}/oauth/${import.meta.env.VITE_PROJECT_KEY}`,
//     prepareHeaders: (headers) => {
//       headers.set(
//         'Authorization',
//         `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
//       );
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<Credentials, LoginRequest>({
//       query: ({ username, password }) => ({
//         url: 'customers/token',
//         method: 'POST',
//         params: { username, password, grant_type: 'password' },
//       }),
//     }),
//   }),
// });
//
// export const { useLoginMutation } = authApi;

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Credentials, LoginRequest>({
      query: ({ username, password }) => ({
        url: `oauth/${import.meta.env.VITE_PROJECT_KEY}/customers/token`,
        method: 'POST',
        params: {
          username,
          password,
          grant_type: 'password',
        },
      }),
    }),
    register: builder.mutation<any, any>({
      async queryFn(arg, _queryApi, _extraOptions, baseQuery) {
        try {
          console.log('Getting token....');

          // получение токена
          const authResponse = await baseQuery({
            url: `/oauth/token`,
            method: 'POST',
            body: new URLSearchParams({
              grant_type: 'client_credentials',
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          if (authResponse.error) {
            console.error('Error getting token:', authResponse.error);
            return { error: authResponse.error };
          }

          const token = (authResponse.data as { access_token: string }).access_token;
          const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

          console.log('Authorization headers for signup:', headers);

          console.log('Create customer...:', headers);

          // создание пользователя
          const signupResponse = await baseQuery({
            url: `${API_BASE_URL}/${PROJECT_KEY}/me/signup`,
            method: 'POST',
            body: JSON.stringify({
              email: arg.email,
              firstName: arg.firstName,
              lastName: arg.lastName,
              password: arg.password,
            }),
            headers,
          });

          if (signupResponse.error) {
            console.error('Error during signup:', signupResponse.error);
            return { error: signupResponse.error };
          }

          console.log('User created, proceeding to login...');

          // вход пользователя
          const loginResponse = await baseQuery({
            url: `${API_BASE_URL}/${PROJECT_KEY}/customers/token`,
            method: 'POST',
            body: JSON.stringify({
              grant_type: 'password',
              username: arg.email,
              password: arg.password,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
          });

          if (loginResponse.error) {
            console.error('Error during login:', loginResponse.error);
            return { error: loginResponse.error };
          }

          const loginData = loginResponse.data as { access_token: string };
          const userToken = loginData.access_token;

          if (typeof signupResponse.data !== 'object' || signupResponse.data === null) {
            return { error: { status: 'CUSTOM_ERROR', error: 'Invalid signup response' } as FetchBaseQueryError };
          }

          return { data: { ...(signupResponse.data as object), token: userToken } as any };
        } catch (error) {
          console.error('Unexpected error:', error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
