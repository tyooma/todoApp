export interface TodoInterface {
  id?: string;
  title: string;
  complete: boolean;
}

export interface RootState {
  todos: TodoInterface[];
}
