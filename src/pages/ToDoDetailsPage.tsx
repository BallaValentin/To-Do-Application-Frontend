import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Alert, Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getToDoById } from '../service/ToDoService';
import ToDoCardDetailed from '../component/card/ToDoCardDetailed';
import ProgressCircle from '../component/progress/ProgressCircle';

export function ToDoDetailsPage() {
  console.log('Loading details page');
  const location = useLocation();
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

      {todo ? <ToDoCardDetailed toDo={todo} /> : <Typography variant="body1">Todo not found </Typography>}
    </Box>
  );
}
