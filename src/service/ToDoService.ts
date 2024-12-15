import axios from 'axios';
import { ToDo } from '../interface/ToDo';

export const GetToDos = async (): Promise<ToDo[]> => {
  const response = await axios.get('/api/todos');
  return response.data;
};

export const GetToDoById = async (id: number): Promise<ToDo> => {
  const response = await axios.get(`/api/todos/${id}`);
  return response.data;
};
