import { Alert, Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { getUsers, deleteUserById } from '../service/UserService';
import ProgressCircle from '../component/progress/ProgressCircle';
import { useTokenValidation } from '../hooks/UseTokenValidation';
import UsersTable from '../component/table/UsersTable';

export function UserListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [adminName, setAdminName] = useState<string>('');

  useTokenValidation();

  useEffect(() => {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken') || '');
    const role = decodedToken.sub?.split('|')[2];
    if (role !== 'admin') {
      navigate('/unauthorized');
    } else {
      setAdminName(decodedToken.sub?.split('|')[0] || '');
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
    <Box>
      <UsersTable users={users || []} onDelete={handleDelete} adminName={adminName} />
    </Box>
  );
}
