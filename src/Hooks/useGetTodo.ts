import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchTodos } from '@/TodoFunction/fetchTodo';

export const useGetTodos = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['todos', page, limit],

    queryFn: () => fetchTodos(page, limit),

    placeholderData: keepPreviousData,
  });
};
