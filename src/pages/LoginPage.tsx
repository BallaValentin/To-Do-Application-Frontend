import { Alert, Box, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AxiosError } from 'axios';
import LoginForm from '../component/form/LoginForm';
import { loginUser } from '../service/UserService';
import { LoginData } from '../interface/LoginData';

export function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setErrorMessage(null);
      navigate('/');
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        setErrorMessage('Invalid username or password.');
      } else {
        setErrorMessage('An unexpected error occured.');
      }
    },
  });

  const handleLogin = (loginData: LoginData) => {
    setErrorMessage(null);
    mutate(loginData);
  };
  return (
    <Box>
      <NavigationBar />
      <Paper elevation={3} sx={{ maxWidth: 300, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <LoginForm onLogin={handleLogin} isPending={isPending} />
      </Paper>
    </Box>
  );
}
