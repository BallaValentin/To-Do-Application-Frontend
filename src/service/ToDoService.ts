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

export const DeleteToDoById = async (id: number): Promise<number> => {
  const response = await axios.delete(`/api/todos/${id}`);
  return response.status;
};

export const CreateToDo = async (toDo: ToDo): Promise<ToDo> => {
  const response = await axios.post('/api/todos', toDo);
  return response.data;
};

export const UpdateToDoById = async (id: number, toDo: ToDo): Promise<ToDo> => {
  const response = await axios.put(`/api/todos/${id}`, toDo);
  return response.data;
};
