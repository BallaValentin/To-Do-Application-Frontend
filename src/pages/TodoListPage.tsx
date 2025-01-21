import React, { useState, useEffect } from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';
import ProgressCircle from '../component/progress/ProgressCircle';
import CreateFab from '../component/fab/CreateFab';
import NavigationBar from '../component/navigation/NavigationBar';
import CustomSnackbar from '../component/snackbar/CustomSnackbar';

export function TodoListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getToDos,
  });

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
    <Box sx={{ mt: 10 }}>
      <NavigationBar />
      {deleteAlert && (
        <CustomSnackbar message="Todo deleted successfully." open={deleteAlert} onClose={() => setDeleteAlert(false)} />
      )}

      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
        {t('mainPageTitle')}
      </Typography>
      {todos?.map((todo) => <ToDoCard key={todo.id} toDo={todo} />)}
      <CreateFab onClick={() => navigate('/todos/create')} />
    </Box>
  );
}
