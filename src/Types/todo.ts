export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  date: string;
};

export type Todos = {
  todos: Todo[];
  totalTodos: number;
  hasNextPage: boolean;
  nextPage: number;
};

export type Page = {
  todos: Todo[];
};

export type Pages = {
  pages: Page[];
};
