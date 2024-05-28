import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { productsApi } from './services/products';
import { meApi } from './services/me.ts';
import authReducer from './features/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [meApi.reducerPath]: meApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, meApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
