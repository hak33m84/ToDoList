import { fetchTodos } from '@/TodoFunction/fetchTodo';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetInfiniteTodos = () => {
  return useInfiniteQuery({
    queryKey: ['todos'],

    queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam, 20),

    getNextPageParam: (LastPage) =>
      LastPage.hasNextPage ? LastPage.nextPage : undefined,

    initialPageParam: 1,
  });
};
