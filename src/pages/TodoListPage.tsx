import React, { useState, useEffect } from 'react';
import { Alert, AlertColor, Box, Fab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import { GetToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';
import ProgressCircle from '../component/progress/ProgressCircle';

export function TodoListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: GetToDos,
  });

  const [deleteAlert, setDeleteAlert] = useState<{ severity: AlertColor; message: string } | null>(null);

  useEffect(() => {
    if (location.state?.deleteAlert) {
      setDeleteAlert(location.state.deleteAlert);
    }
  }, [location.state]);

  if (isLoading) {
    return <ProgressCircle loadingMessage="Fetching todos..." />;
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
      {deleteAlert && <Alert severity={deleteAlert.severity}>{deleteAlert.message}</Alert>}

      <h1>List of Todos</h1>
      {todos?.map((todo) => <ToDoCard key={todo.id} toDo={todo} />)}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#007bff',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
        onClick={() => navigate('/todos/create')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
