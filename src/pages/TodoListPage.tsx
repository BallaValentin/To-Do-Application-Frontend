import React, { useState, useEffect } from 'react';
import { Alert, Box, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { filterToDos, getToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';
import ProgressCircle from '../component/progress/ProgressCircle';
import CreateFab from '../component/fab/CreateFab';
import NavigationBar from '../component/navigation/NavigationBar';
import CustomSnackbar from '../component/snackbar/CustomSnackbar';
import SearchForm from '../component/form/SearchForm';
import { ToDoSearchParams } from '../interface/ToDoSearchParams';
import useTokenChecker from '../hooks/UseTokenChecker';
import TokenExpiredModal from '../component/modal/TokenExpiredModal';
import useNullTokenChecker from '../hooks/UseNullTokenChecker';

export function TodoListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  useNullTokenChecker();
  const isTokenExpired = useTokenChecker();

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

  const { mutate } = useMutation({
    mutationFn: (searchFilters: ToDoSearchParams) => filterToDos(searchFilters),
    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], data);
    },
  });

  const handleSearchSubmit = (searchParams: ToDoSearchParams) => {
    mutate(searchParams);
  };

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
        <CustomSnackbar message={t('todoDeletedAlert')} open={deleteAlert} onClose={() => setDeleteAlert(false)} />
      )}

      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
        {t('mainPageTitle')}
      </Typography>

      <Paper elevation={3} sx={{ m: 4, p: 2 }}>
        <SearchForm onSearch={handleSearchSubmit} />
      </Paper>

      {todos?.map((todo) => <ToDoCard key={todo.id} toDo={todo} />)}
      <CreateFab onClick={() => navigate('/todos/create')} />

      {isTokenExpired && <TokenExpiredModal isInvalidToken={isTokenExpired} />}
    </Box>
  );
}
