import { configureStore } from '@reduxjs/toolkit';

import todos from './todos';
import { todosApi } from '../services/todosApi';

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    todos,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export default store;
