import { Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import ToDoForm from '../component/form/ToDoForm';
import { createToDo } from '../service/ToDoService';
import { ToDo } from '../interface/ToDo';
import { ToDoResponse } from '../interface/ToDoResponse';
import TokenExpiredModal from '../component/modal/TokenExpiredModal';
import NavigationBar from '../component/navigation/NavigationBar';
import useTokenChecker from '../hooks/UseTokenChecker';

export function ToDoCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const isTokenExpired = useTokenChecker();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createToDo,
    onSuccess: (createdTodo: ToDoResponse) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate(`/todos/${createdTodo.id}`, {
        state: {
          success: t('todoCreatedAlert'),
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
    <Box sx={{ mt: 10 }}>
      {isError && <Alert severity="error">{(error as Error).message}</Alert>}
      <ToDoForm isPending={isPending} onSubmit={handleCreateToDo} />
      <TokenExpiredModal isInvalidToken={isTokenExpired} />
      <NavigationBar />
    </Box>
  );
}
