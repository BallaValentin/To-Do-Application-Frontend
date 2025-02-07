import axios from 'axios';
import { ToDo } from '../interface/ToDo';
import { ToDoResponse } from '../interface/ToDoResponse';
import { ToDoSearchParams } from '../interface/ToDoSearchParams';

export const toDoApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export const getToDos = async (): Promise<ToDo[]> => {
  console.log(`The access token is: ${sessionStorage.getItem('accessToken')}`);
  const response = await toDoApi.get<ToDo[]>('/todos', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

const cleanFilters = (filters: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(filters).filter(([, value]) => Boolean(value)));
};

export const filterToDos = async (toDoFilters: ToDoSearchParams): Promise<ToDo[]> => {
  const response = await toDoApi.get<ToDo[]>('/todos', {
    params: cleanFilters(toDoFilters as unknown as Record<string, unknown>),
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const getToDoById = async (id: number): Promise<ToDoResponse> => {
  const response = await toDoApi.get<ToDoResponse>(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const deleteToDoById = async (id: number): Promise<number> => {
  const response = await toDoApi.delete<number>(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });

  return response.status;
};

export const createToDo = async (toDo: ToDo): Promise<ToDoResponse> => {
  const response = await toDoApi.post<ToDoResponse>('/todos', toDo, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const updateToDoById = async (id: number, toDo: ToDo): Promise<ToDoResponse> => {
  const response = await toDoApi.put<ToDoResponse>(`/todos/${id}`, toDo, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};
