import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ClientCredentialsFlowResponse,
  Credentials,
  Customer,
  LoginRequest,
  RegisterResponseData,
} from '../../types/auth';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const API_BASE_URL = import.meta.env.VITE_HOST;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL,
  }),
  endpoints: (builder) => ({
    clientCredentialsFlowAuth: builder.mutation<ClientCredentialsFlowResponse, void>({
      query: () => ({
        url: '/oauth/token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      }),
    }),
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
    register: builder.mutation<RegisterResponseData, { token: string; customer: Customer }>({
      query: ({ token, customer }) => ({
        url: `${API_BASE_URL}/${PROJECT_KEY}/me/signup`,
        method: 'POST',
        body: customer,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useClientCredentialsFlowAuthMutation } = authApi;
