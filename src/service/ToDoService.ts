import axios from 'axios';
import { ToDo } from '../interface/ToDo';

export const GetToDos = async (): Promise<ToDo[]> => {
  const response = await axios.get('http://localhost:8080/api/todos');
  return response.data;
};
