import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pagination } from '../../types/common';
import { ProductType } from '../../types/product-type';
import { RootState } from '../store';

const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const productTypesApi = createApi({
  reducerPath: 'productTypesApi',
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
    getProductTypes: builder.query<Pagination<ProductType>, unknown>({
      query: () => ({
        url: '/product-types',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductTypesQuery, useLazyGetProductTypesQuery } = productTypesApi;
