import { addTodo } from '@/TodoFunction/addTodo';
import { Page, Pages, Todo } from '@/Types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,

    onMutate: async (title: Todo['title']) => {
      await queryClient.cancelQueries({
        queryKey: ['todos'],
      });

      const previousTodos = queryClient.getQueryData<{ todos: Todo[] }>([
        'todos',
      ]);

      // queryClient.setQueryData(['todos'], (old: Pages) => ({
      //   ...old,
      //   pages: old?.pages.map((page: Page) => ({
      //     ...page,
      //     todos: [
      //       {
      //         id: String(Date.now()),
      //         title,
      //         completed: false,
      //         date: String(Date.now()),
      //       },
      //       ...(page?.todos || []),
      //     ],
      //   })),
      // }));

      queryClient.setQueryData(['todos'], (old: Pages) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: Page, index: number) => {
            if (index === 0) {
              return {
                ...page,
                todos: [
                  {
                    id: String(Date.now()),
                    title,
                    completed: false,
                    date: String(Date.now()),
                  },
                  ...(page?.todos || []),
                ],
              };
            }
            return page;
          }),
        };
      });

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
