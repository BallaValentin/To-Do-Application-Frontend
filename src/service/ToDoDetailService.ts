import axios from 'axios';
import { ToDoDetailResponse } from '../interface/ToDoDetailResponse';
import { ToDoDetail } from '../interface/ToDoDetail';

export const toDoDetailApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export const getToDoDetails = async (todoId: number): Promise<ToDoDetailResponse[]> => {
  const response = await toDoDetailApi.get<ToDoDetailResponse[]>(`/todos/${todoId}/details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
  return response.data;
};

export const createToDoDetail = async (toDoDetail: ToDoDetail, todoId: number): Promise<ToDoDetailResponse> => {
  const response = await toDoDetailApi.post<ToDoDetailResponse>(`/todos/${todoId}/details`, toDoDetail, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
  return response.data;
};

export const deleteToDoDetail = async (todoId: number, todoDetailId: number): Promise<number> => {
  const response = await toDoDetailApi.delete<ToDoDetail[]>(`/todos/${todoId}/details/${todoDetailId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
  return response.status;
};
