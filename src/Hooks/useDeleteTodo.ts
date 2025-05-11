import { deleteTodo } from '@/TodoFunction/deleteTodo';
import { Page, Pages, Todo } from '@/Types/todo';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onMutate: async (id: Todo['id']) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old: Pages) => ({
        ...old,
        pages: old?.pages.map((page: Page) => ({
          ...page,
          todos: (page?.todos || []).filter((todo: Todo) => todo.id !== id),
        })),
      }));

      return { previousTodos };
    },

    onError: (_err, _todo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
