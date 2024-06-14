import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cart, CartDraft, CartUpdateAction } from '../../types/cart.ts';
import { Pagination } from '../../types/common.ts';
import { RootState } from '../store';

const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const cartApi = createApi({
  reducerPath: 'cartApi',
  tagTypes: ['Cart'],
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
    getUserCart: builder.query<Pagination<Cart>, void>({
      query: () => ({
        url: '/me/carts',
        method: 'GET',
        providesTags: ['Cart'],
      }),
    }),
    createCart: builder.mutation<Cart, CartDraft>({
      query: (cart) => ({
        url: '/me/carts',
        method: 'POST',
        body: cart,
      }),
    }),
    updateCart: builder.mutation<Cart, { id: string; version: number; actions: CartUpdateAction[] }>({
      query: (cart) => ({
        url: `/me/carts/${cart.id}`,
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetUserCartQuery, useLazyGetUserCartQuery, useCreateCartMutation, useUpdateCartMutation } = cartApi;
