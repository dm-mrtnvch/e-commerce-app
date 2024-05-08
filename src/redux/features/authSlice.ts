import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Credentials } from '../../types/auth';

type AuthState = {
  credentials: Credentials | null;
};

const initialState: AuthState = {
  credentials: JSON.parse(localStorage.getItem('credentials') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<Credentials>) => {
      state.credentials = payload;
      localStorage.setItem('credentials', JSON.stringify(payload));
    },
    resetCredentials: (state) => {
      state.credentials = null;
      localStorage.removeItem('credentials');
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export default authSlice.reducer;
