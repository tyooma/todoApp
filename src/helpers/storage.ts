import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoInterface } from '../types/store';

export const saveTodosToStorage = async (todos: TodoInterface[]) => {
  try {
    const jsonTodos = JSON.stringify(todos);

    await AsyncStorage.setItem('todos', jsonTodos);
  } catch (error) {
    console.error('Error', error);
  }
};

export const loadTodosFromStorage = async () => {
  try {
    const jsonTodos = await AsyncStorage.getItem('todos');

    return jsonTodos != null ? JSON.parse(jsonTodos) : [];
  } catch (error) {
    console.error('Error', error);
    return [];
  }
};
