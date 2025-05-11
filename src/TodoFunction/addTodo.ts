import { customAxios } from '@/Config/api';

export const addTodo = async (title: string) => {
  const response = await customAxios.post('/todos', {
    title,
    completed: false,
  });
  return response.data;
};
