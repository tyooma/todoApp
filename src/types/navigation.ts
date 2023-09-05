import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum MainScreens {
  Todos = 'Todos',
  AddTodo = 'AddTodo',
}

export type MainNavigationList = {
  Todos: undefined;
  AddTodo: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainNavigationList>;
