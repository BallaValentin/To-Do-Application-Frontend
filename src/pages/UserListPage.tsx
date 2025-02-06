import { Alert, Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { getUsers, deleteUserById } from '../service/UserService';
import ProgressCircle from '../component/progress/ProgressCircle';
import UsersTable from '../component/table/UsersTable';
import NavigationBar from '../component/navigation/NavigationBar';
import CustomSnackbar from '../component/snackbar/CustomSnackbar';
import useTokenChecker from '../hooks/UseTokenChecker';
import TokenExpiredModal from '../component/modal/TokenExpiredModal';

export function UserListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [adminName, setAdminName] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const isTokenExpired = useTokenChecker();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken == null) {
      navigate('/login');
    } else {
      const decodedToken = jwtDecode(jwtToken);
      const role = decodedToken.sub?.split('|')[2];
      if (role !== 'admin') {
        navigate('/unauthorized');
      } else {
        setAdminName(decodedToken.sub?.split('|')[0] || '');
      }
    }
  });

  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteUserById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSuccess(true);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        navigate('/unauthorized');
      }
    },
  });

  const handleDelete = (id: number) => {
    mutate(id);
  };

  if (isLoading) {
    return <ProgressCircle loadingMessage="Fetching users..." />;
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
      {success && <CustomSnackbar open={success} onClose={() => setSuccess(false)} message={t('userDeletedAlert')} />}
      <UsersTable users={users || []} onDelete={handleDelete} adminName={adminName} />

      {isTokenExpired && <TokenExpiredModal isInvalidToken={isTokenExpired} />}
      <NavigationBar />
    </Box>
  );
}
