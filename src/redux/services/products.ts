import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Pagination } from '../../types/common';
import { Product } from '../../types/product';
import { ProductProjection } from '../../types/product-projection.ts';

const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/${PROJECT_KEY}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.credentials?.access_token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Pagination<Product>, unknown>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    getProductByKey: builder.query<ProductProjection, string>({
      query: (key) => ({
        url: `/products/key=${key}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery, useGetProductByKeyQuery } = productsApi;
