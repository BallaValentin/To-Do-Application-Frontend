import axios from 'axios';
import { ToDo } from '../interface/ToDo';

export const toDoApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export const GetToDos = async (): Promise<ToDo[]> => {
  const response = await toDoApi.get<ToDo[]>('/todos');
  return response.data;
};

export const GetToDoById = async (id: number): Promise<ToDo> => {
  const response = await toDoApi.get<ToDo>(`/todos/${id}`);
  return response.data;
};

export const DeleteToDoById = async (id: number): Promise<number> => {
  const response = await toDoApi.delete<number>(`/todos/${id}`);
  return response.status;
};

export const CreateToDo = async (toDo: ToDo): Promise<ToDo> => {
  const response = await toDoApi.post<ToDo>('/todos', toDo);
  return response.data;
};

export const UpdateToDoById = async (id: number, toDo: ToDo): Promise<ToDo> => {
  const response = await toDoApi.put<ToDo>(`/todos/${id}`, toDo);
  return response.data;
};
