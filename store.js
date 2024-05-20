import { configureStore } from '@reduxjs/toolkit';
import authSlice, { getUserInfo } from './src/features/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});


store.dispatch(getUserInfo());

export default store;