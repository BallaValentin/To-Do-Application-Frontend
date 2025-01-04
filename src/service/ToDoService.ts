import axios from 'axios';
import { ToDo } from '../interface/ToDo';
import { ToDoResponse } from '../interface/ToDoResponse';

export const toDoApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export const getToDos = async (): Promise<ToDo[]> => {
  const response = await toDoApi.get<ToDo[]>('/todos');
  return response.data;
};

export const getToDoById = async (id: number): Promise<ToDo> => {
  const response = await toDoApi.get<ToDo>(`/todos/${id}`);
  return response.data;
};

export const deleteToDoById = async (id: number): Promise<number> => {
  const response = await toDoApi.delete<number>(`/todos/${id}`);
  return response.status;
};

export const createToDo = async (toDo: ToDo): Promise<ToDoResponse> => {
  const response = await toDoApi.post<ToDoResponse>('/todos', toDo);
  return response.data;
};

export const updateToDoById = async (id: number, toDo: ToDo): Promise<ToDoResponse> => {
  const response = await toDoApi.put<ToDoResponse>(`/todos/${id}`, toDo);
  return response.data;
};
