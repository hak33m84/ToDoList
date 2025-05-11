import { customAxios } from '@/Config/api';

export const updateTodo = async (
  id: string,
  data: { title: string; completed: boolean; date?: string }
) => {
  const formattedData = {
    ...data,
    completed: Boolean(data.completed),
    date: data.date ? new Date(data.date).toISOString() : undefined,
  };

  console.log('Sending Updated Request:', formattedData);

  const response = await customAxios.put(`/todos/${id}`, formattedData);
  return response.data;
};
