import axios from 'axios';
import { LoginData } from '../interface/LoginData';
import { UserResponse } from '../interface/UserResponse';
import { RegisterData } from '../interface/RegisterData';
import { UserAdminResp } from '../interface/UserAdminResp';
import { LoginResponse } from '../interface/LoginResponse';
import { RefreshToken } from '../interface/RefreshToken';

export const userApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Accept: 'application/json',
  },
});

export const loginUser = async (userLogin: LoginData): Promise<LoginResponse> => {
  const response = await userApi.post<LoginResponse>('/auth/login', userLogin);
  const { accessToken, refreshToken } = response.data;
  sessionStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken || '');
  return response.data;
};

export const registerUser = async (userRegister: RegisterData): Promise<number> => {
  const response = await userApi.post<UserResponse>('/auth/register', userRegister);
  return response.status;
};

export const getUsers = async (): Promise<UserAdminResp[]> => {
  const response = await userApi.get<UserAdminResp[]>('/admin/users', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const deleteUserById = async (id: number): Promise<number> => {
  const response = await userApi.delete<number>(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.status;
};

export const getNewAccessToken = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await userApi.get<RefreshToken>('/auth/refreshToken', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const { accessToken } = response.data;
  sessionStorage.setItem('accessToken', accessToken);
};
