import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { authApi } from './services/auth';
import { productProjectionsApi } from './services/product-projections';
import { productTypesApi } from './services/product-types';
import { productsApi } from './services/products';
import { categoryApi } from './services/category.ts';
import { meApi } from './services/me.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productProjectionsApi.reducerPath]: productProjectionsApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [productTypesApi.reducerPath]: productTypesApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [meApi.reducerPath]: meApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        productProjectionsApi.middleware,
        productsApi.middleware,
        productTypesApi.middleware,
        categoryApi.middleware,
        meApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
