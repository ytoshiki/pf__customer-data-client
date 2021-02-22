export interface StateType {
  todos: {
    task: string;
    id: string;
    completed: boolean;
  }[];
  loading: {
    todos: boolean;
    todo: boolean;
  };
}
