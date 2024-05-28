import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ClientCredentialsFlowResponse, Credentials } from '../../types/auth';

type AuthState = {
  credentials: ClientCredentialsFlowResponse | null;
  clientCredentials: Credentials | null;
};

const initialState: AuthState = {
  credentials: JSON.parse(localStorage.getItem('credentials') || 'null'),
  clientCredentials: JSON.parse(localStorage.getItem('clientCredentials') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<ClientCredentialsFlowResponse>) => {
      state.credentials = payload;
      localStorage.setItem('credentials', JSON.stringify(payload));
    },
    resetCredentials: (state) => {
      state.credentials = null;
      localStorage.removeItem('credentials');
    },
    setClientCredentials: (state, { payload }: PayloadAction<Credentials>) => {
      state.credentials = payload;
      localStorage.setItem('credentials', JSON.stringify(payload));
    },
    resetClientCredentials: (state) => {
      state.credentials = null;
      localStorage.removeItem('credentials');
    },
  },
});

export const { setCredentials, resetCredentials, setClientCredentials, resetClientCredentials } = authSlice.actions;

export default authSlice.reducer;
