import { Alert, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../service/UserService';
import ProgressCircle from '../component/progress/ProgressCircle';
import { useTokenValidation } from '../hooks/UseTokenValidation';

export function UserListPage() {
  const navigate = useNavigate();

  useTokenValidation();

  useEffect(() => {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken') || '');
    const role = decodedToken.sub?.split('|')[2];
    if (role !== 'admin') {
      navigate('/unauthorized');
    }
  });

  const { isLoading, error, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

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
  return <Box>Users</Box>;
}
