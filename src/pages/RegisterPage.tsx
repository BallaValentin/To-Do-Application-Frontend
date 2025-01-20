import { Alert, Box, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AxiosError } from 'axios';
import RegisterForm from '../component/form/RegisterForm';
import { RegisterData } from '../interface/RegisterData';
import { registerUser } from '../service/UserService';
import NavigationBar from '../component/navigation/NavigationBar';

interface ErrorResponse {
  error: string;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setErrorMessage(null);
      navigate('/login');
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      console.log(err.response);
      if (err.response?.status === 401) {
        if (err.response.data.error === 'Username is already taken') {
          setErrorMessage('Username is already taken.');
        } else if (err.response.data.error === 'Email is already taken') {
          setErrorMessage('Email is already taken.');
        } else {
          setErrorMessage('An unexpected error has occured.');
        }
      } else if (err.response?.status === 400) {
        setErrorMessage('Invalid credentials.');
      } else {
        setErrorMessage('An unexpected error has occured.');
      }
    },
  });
  const handleRegister = (registerData: RegisterData) => {
    setErrorMessage(null);
    mutate(registerData);
  };
  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: 300, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <RegisterForm onRegister={handleRegister} isPending={isPending} />
      </Paper>
      <NavigationBar />
    </Box>
  );
}
