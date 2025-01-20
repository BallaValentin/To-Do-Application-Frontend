import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { deleteToDoById, getToDoById } from '../service/ToDoService';
import ToDoCardDetailed from '../component/card/ToDoCardDetailed';
import ProgressCircle from '../component/progress/ProgressCircle';
import CreateFab from '../component/fab/CreateFab';
import ToDoDetailModal from '../component/modal/ToDoDetailModal';
import { createToDoDetail, deleteToDoDetail, getToDoDetails } from '../service/ToDoDetailService';
import ToDoDetailCard from '../component/card/ToDoDetailCard';
import { ToDoDetail } from '../interface/ToDoDetail';
import NavigationBar from '../component/navigation/NavigationBar';
import { useTranslation } from 'react-i18next';

export function ToDoDetailsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const [success, setSuccess] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
    }
  }, [location.state]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['details'] });
    queryClient.invalidateQueries({ queryKey: ['details'] });
  }, [id]);

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

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub?.split('|')[0];
      setIsOwner(username === todo?.createdBy);
    }
  });

  const { isLoading: isLoadingDetails, data: details } = useQuery({
    queryKey: ['details'],
    queryFn: () => getToDoDetails(Number(id)),
  });

  const { mutate: addDetail } = useMutation({
    mutationFn: (toDoDetail: ToDoDetail) => createToDoDetail(toDoDetail, Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
    },
  });

  const handleDetailSubmit = (toDoDetail: ToDoDetail) => {
    setOpenModal(false);
    addDetail(toDoDetail);
  };

  const { mutate: deleteDetail } = useMutation({
    mutationFn: (toDoDetailId: number) => deleteToDoDetail(Number(id), toDoDetailId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
    },
  });

  const handleDeleteDetail = (toDoDetailId: number) => {
    deleteDetail(toDoDetailId);
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
    <Box sx={{ mt: 10 }}>
      {success && <Alert severity="success">{success}</Alert>}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t('detailPageTitle')}
      </Typography>

      {todo ? (
        <ToDoCardDetailed toDo={todo} handleDelete={handleDelete} isOwner={isOwner} />
      ) : (
        <Typography variant="body1">Todo not found </Typography>
      )}

      {isPending && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          Deleting ToDo...
        </Box>
      )}

      {isLoadingDetails && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          Loading details...
        </Box>
      )}

      <Box sx={{ m: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
        {details?.map((detail) => (
          <ToDoDetailCard key={detail.id} toDoDetail={detail} onClick={() => handleDeleteDetail(detail.id)} />
        ))}
      </Box>

      <ToDoDetailModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleDetailSubmit} />

      {isOwner && <CreateFab onClick={() => setOpenModal(true)} />}

      <NavigationBar />
    </Box>
  );
}
