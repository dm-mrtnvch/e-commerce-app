import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Customer } from '../../types/auth.ts';
import { ChangeUserInfo } from '../../types/me.ts';

const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const meApi = createApi({
  reducerPath: 'meApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/${PROJECT_KEY}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.clientCredentials?.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<Customer, void>({
      query: () => ({
        url: `/me`,
        method: 'GET',
      }),
    }),
    updateUserProfile: builder.mutation<Customer, { id: string; version: number; actions: ChangeUserInfo[] }>({
      query: ({ id, version, actions }) => ({
        url: `/customers/${id}`,
        method: 'POST',
        body: { version, actions },
      }),
    }),
    changePassword: builder.mutation<
      void,
      { id: string; version: number; currentPassword: string; newPassword: string }
    >({
      query: ({ id, version, currentPassword, newPassword }) => ({
        url: `/customers/password`,
        method: 'POST',
        body: { id, version, currentPassword, newPassword },
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useChangePasswordMutation } = meApi;
