import axios from 'axios';
import { LoginData } from '../interface/LoginData';
import { UserResponse } from '../interface/UserResponse';
import { RegisterData } from '../interface/RegisterData';

export const userApi = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  headers: {
    Accept: 'application/json',
  },
});

export const loginUser = async (userLogin: LoginData): Promise<UserResponse> => {
  console.log(`Sending: ${userLogin.username} and ${userLogin.password}`);
  const response = await userApi.post<UserResponse>('/login', userLogin);
  return response.data;
};

export const registerUser = async (userRegister: RegisterData): Promise<number> => {
  const response = await userApi.post<UserResponse>('/register', userRegister);
  return response.status;
};
