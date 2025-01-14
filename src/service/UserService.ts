import axios from 'axios';
import { LoginData } from '../interface/LoginData';
import { UserResponse } from '../interface/UserResponse';
import { RegisterData } from '../interface/RegisterData';
import { UserAdminResp } from '../interface/UserAdminResp';

export const userApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export const loginUser = async (userLogin: LoginData): Promise<UserResponse> => {
  const response = await userApi.post<UserResponse>('/users/login', userLogin);
  const { jwtToken } = response.data;
  localStorage.setItem('jwtToken', jwtToken);
  return response.data;
};

export const registerUser = async (userRegister: RegisterData): Promise<number> => {
  const response = await userApi.post<UserResponse>('/users/register', userRegister);
  return response.status;
};

export const getUsers = async (): Promise<UserAdminResp[]> => {
  const response = await userApi.get<UserAdminResp[]>('/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
  return response.data;
};
