import { Alert, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ToDoForm from '../component/form/ToDoForm';
import { ToDo } from '../interface/ToDo';
import { getToDoById, updateToDoById } from '../service/ToDoService';
import { ToDoResponse } from '../interface/ToDoResponse';

export function ToDoUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: toDo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getToDoById(Number(id)),
  });

  const {
    mutate,
    isPending,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: (formData: ToDo) => updateToDoById(Number(id), formData),
    onSuccess: (updatedTodo: ToDoResponse) => {
      queryClient.invalidateQueries({ queryKey: ['todo'], id });
      navigate(`/todos/${updatedTodo.id}`, {
        state: {
          success: `To do with id ${updatedTodo.id} updated successfully`,
        },
      });
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        navigate('/unauthorized');
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="error">{(error as Error).message}</div>;
  }

  const handleUpdateToDo = (formData: ToDo) => {
    mutate(formData);
  };

  return (
    <Box>
      {isUpdateError && <Alert severity="error">{(updateError as Error).message}</Alert>}
      <ToDoForm onSubmit={handleUpdateToDo} initialValues={toDo} />
      {isPending && <Typography variant="body1">Updating todo...</Typography>}
    </Box>
  );
}
