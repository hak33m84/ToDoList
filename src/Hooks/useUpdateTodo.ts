import { updateTodo } from '@/TodoFunction/updateTodo';
import { Page, Pages, Todo } from '@/Types/todo';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      completed,
      date,
    }: {
      id: string;
      title: string;
      completed: boolean;
      date: string;
    }) =>
      updateTodo(id, {
        title: title.trim(),
        completed: Boolean(completed),
        date: date ? new Date(date).toISOString() : undefined,
      }),

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old: Pages) => ({
        ...old,
        pages: old?.pages.map((page: Page) => ({
          ...page,
          todos: page.todos.map((todo: Todo) =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
          ),
        })),
      }));

      return { previousTodos };
    },

    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
