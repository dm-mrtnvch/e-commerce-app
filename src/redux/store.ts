import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { authApi } from './services/auth';
import { cardApi } from './services/card.ts';
import { categoryApi } from './services/category.ts';
import { meApi } from './services/me.ts';
import { productProjectionsApi } from './services/product-projections';
import { productTypesApi } from './services/product-types';
import { productsApi } from './services/products';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [cardApi.reducerPath]: cardApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [meApi.reducerPath]: meApi.reducer,
  [productProjectionsApi.reducerPath]: productProjectionsApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [productTypesApi.reducerPath]: productTypesApi.reducer,
  auth: authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        cardApi.middleware,
        categoryApi.middleware,
        meApi.middleware,
        productProjectionsApi.middleware,
        productsApi.middleware,
        productTypesApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
