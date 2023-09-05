import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../types/store';

const initialState: RootState = { todos: [] };

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = [...action.payload];
    },
  },
});

export const { setTodos } = todos.actions;

export default todos.reducer;
