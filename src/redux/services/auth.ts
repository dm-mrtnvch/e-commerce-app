import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Credentials, LoginRequest } from '../../types/auth';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_URL}/oauth/${import.meta.env.VITE_PROJECT_KEY}`,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Credentials, LoginRequest>({
      query: ({ username, password }) => ({
        url: 'customers/token',
        method: 'POST',
        params: { username, password, grant_type: 'password' },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
