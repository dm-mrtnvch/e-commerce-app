import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pagination, Params } from '../../types/common';
import { ProductProjection } from '../../types/product-projection';
import { RootState } from '../store';

const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const productProjectionsApi = createApi({
  reducerPath: 'productProjectionsApi',
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
    getProductProjections: builder.query<Pagination<ProductProjection>, void>({
      query: () => ({
        url: '/product-projections',
        method: 'GET',
      }),
    }),
    getProductProjectionsSearch: builder.query<Pagination<ProductProjection>, Params>({
      query: ({ offset, filter, sort }) => ({
        url: `/product-projections/search${filter ? `?filter=${filter}` : ''}`,
        method: 'GET',
        params: { offset, sort },
      }),
    }),
  }),
});

export const {
  useGetProductProjectionsQuery,
  useLazyGetProductProjectionsQuery,
  useGetProductProjectionsSearchQuery,
  useLazyGetProductProjectionsSearchQuery,
} = productProjectionsApi;
