import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../../types/category';
import { Pagination } from '../../types/common';
import { RootState } from '../store';

const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
    getCategories: builder.query<Pagination<Category>, void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = categoryApi;
