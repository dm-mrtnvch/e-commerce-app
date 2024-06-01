import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Customer, Address } from '../../types/auth.ts';
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
    addAddress: builder.mutation<void, { id: string; version: number; address: Address }>({
      query: ({ id, version, address }) => ({
        url: `/customers/${id}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'addAddress',
              address,
            },
          ],
        },
      }),
    }),
    removeAddress: builder.mutation<void, { id: string; version: number; addressId: string }>({
      query: ({ id, version, addressId }) => ({
        url: `/customers/${id}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'removeAddress',
              addressId,
            },
          ],
        },
      }),
    }),
    updateAddress: builder.mutation<void, { id: string; version: number; addressId: string; address: Address }>({
      query: ({ id, version, addressId, address }) => ({
        url: `/customers/${id}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'changeAddress',
              addressId,
              address,
            },
          ],
        },
      }),
    }),
    setDefaultShippingAddress: builder.mutation<void, { id: string; version: number; addressId: string }>({
      query: ({ id, version, addressId }) => ({
        url: `/customers/${id}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'setDefaultShippingAddress',
              addressId,
            },
          ],
        },
      }),
    }),
    setDefaultBillingAddress: builder.mutation<void, { id: string; version: number; addressId: string }>({
      query: ({ id, version, addressId }) => ({
        url: `/customers/${id}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'setDefaultBillingAddress',
              addressId,
            },
          ],
        },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useAddAddressMutation,
  useRemoveAddressMutation,
  useUpdateAddressMutation,
  useSetDefaultShippingAddressMutation,
  useSetDefaultBillingAddressMutation,
} = meApi;
