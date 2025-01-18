import React, { useState, useEffect } from 'react';
import { Alert, AlertColor, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';
import ProgressCircle from '../component/progress/ProgressCircle';
import CommonHeader from '../component/header/CommonHeader';
import CreateFab from '../component/fab/CreateFab';

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
    queryFn: getToDos,
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
      <CommonHeader />
      {deleteAlert && <Alert severity={deleteAlert.severity}>{deleteAlert.message}</Alert>}

      <h1>List of Todos</h1>
      {todos?.map((todo) => <ToDoCard key={todo.id} toDo={todo} />)}
      <CreateFab onClick={() => navigate('/todos/create')} />
    </Box>
  );
}
