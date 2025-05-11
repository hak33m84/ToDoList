import { customAxios } from '@/Config/api';

export const deleteTodo = async (id: string) => {
  const response = await customAxios.delete(`/todos/${id}`);

  return response.data;
};
