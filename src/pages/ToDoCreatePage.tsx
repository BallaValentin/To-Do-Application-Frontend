import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ToDoForm from '../component/form/ToDoForm';
import { createToDo } from '../service/ToDoService';
import { ToDo } from '../interface/ToDo';
import { ToDoResponse } from '../interface/ToDoResponse';

export function ToDoCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    onError: (err: unknown) => {
      console.error(err);
    },
  });

  const handleCreateToDo = (formData: ToDo) => {
    mutate(formData);
  };

  return (
    <Box>
      {isError && <Alert severity="error">{(error as Error).message}</Alert>}
      <ToDoForm onSubmit={handleCreateToDo} />
      {isPending && <Typography variant="body1">Creating todo...</Typography>}
    </Box>
  );
}
