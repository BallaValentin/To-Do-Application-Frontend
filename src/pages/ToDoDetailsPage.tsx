import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteToDoById, getToDoById } from '../service/ToDoService';
import ToDoCardDetailed from '../component/card/ToDoCardDetailed';
import ProgressCircle from '../component/progress/ProgressCircle';
import { queryClient } from '../App';

export function ToDoDetailsPage() {
  console.log('Loading details page');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
    }
  }, [location.state]);

  const {
    data: todo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getToDoById(Number(id)),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteToDoById(Number(id)),
    onSuccess: (statusCode: number) => {
      if (statusCode === 204) {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        navigate('/', {
          state: { deleteAlert: { severity: 'success', message: `To do with id ${id} deleted succesfully` } },
        });
      } else {
        navigate('/', {
          state: { deleteAlert: { severity: 'error', message: `To do with id ${id} doesnt exist` } },
        });
      }
    },
  });

  const handleDelete = () => {
    mutate();
  };

  if (isLoading) {
    return <ProgressCircle loadingMessage={`Fetching todo with id ${id}`} />;
  }

  if (isError) {
    return (
      <Box>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {success && <Alert severity="success">{success}</Alert>}
      <Typography variant="h4" gutterBottom>
        ToDo details
      </Typography>

      {todo ? (
        <ToDoCardDetailed toDo={todo} handleDelete={handleDelete} />
      ) : (
        <Typography variant="body1">Todo not found </Typography>
      )}
    </Box>
  );
}
