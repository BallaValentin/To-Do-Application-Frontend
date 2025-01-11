import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteToDoById, getToDoById } from '../service/ToDoService';
import ToDoCardDetailed from '../component/card/ToDoCardDetailed';
import ProgressCircle from '../component/progress/ProgressCircle';
import CommonHeader from '../component/header/CommonHeader';

export function ToDoDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
    isPending,
  } = useMutation({
    mutationFn: () => deleteToDoById(Number(id)),
    onSuccess: (status: number) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      if (status === 204) {
        navigate('/', {
          state: { deleteAlert: { severity: 'success', message: `To do with id ${todo?.id} deleted succesfully` } },
        });
      } else {
        navigate('/', {
          state: { deleteAlert: { severity: 'error', message: `To do with id ${todo?.id} doesnt exist` } },
        });
      }
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        navigate('/unauthorized');
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

  if (isDeleteError) {
    return (
      <Box>
        <Alert severity="error">{deleteError.message}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <CommonHeader />
      {success && <Alert severity="success">{success}</Alert>}
      <Typography variant="h4" gutterBottom>
        ToDo details
      </Typography>

      {todo ? (
        <ToDoCardDetailed toDo={todo} handleDelete={handleDelete} />
      ) : (
        <Typography variant="body1">Todo not found </Typography>
      )}
      {isPending && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          Deleting ToDo...
        </Box>
      )}
    </Box>
  );
}
