import { customAxios } from '@/Config/api';

export const fetchTodos = async (page = 1, limit = 20) => {
  const response = await customAxios.get(
    `/todos?page=${page}&limit=${limit}&order=dsc`
  );
  return response.data;
};
