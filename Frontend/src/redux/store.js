import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import booksApi from './features/booksApi';
import ordersApi from './features/ordersApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});
