import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ToDoForm from '../component/form/ToDoForm';
import { createToDo } from '../service/ToDoService';
import { ToDo } from '../interface/ToDo';
import { ToDoResponse } from '../interface/ToDoResponse';
import TokenExpiredModal from '../component/modal/TokenExpiredModal';
import { useTokenValidation } from '../hooks/UseTokenValidation';
import CommonHeader from '../component/header/CommonHeader';

export function ToDoCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isInvalidToken = useTokenValidation();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createToDo,
    onSuccess: (createdTodo: ToDoResponse) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate(`/todos/${createdTodo.id}`, {
        state: {
          success: `To do with id ${createdTodo.id} created successfully`,
        },
      });
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        navigate('/unauthorized');
      }
    },
  });

  const handleCreateToDo = (formData: ToDo) => {
    mutate(formData);
  };

  return (
    <Box>
      <CommonHeader />
      {isError && <Alert severity="error">{(error as Error).message}</Alert>}
      <ToDoForm isPending={isPending} onSubmit={handleCreateToDo} />
      <TokenExpiredModal isInvalidToken={isInvalidToken} />
    </Box>
  );
}
