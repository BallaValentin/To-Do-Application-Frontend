import { Alert, Box, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import LoginForm from '../component/form/LoginForm';
import { loginUser } from '../service/UserService';
import { LoginData } from '../interface/LoginData';
import NavigationBar from '../component/navigation/NavigationBar';
import CustomSnackbar from '../component/snackbar/CustomSnackbar';

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registerSuccess, setRegisterSucces] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.success) {
      setRegisterSucces(true);
    }
  }, [location.state]);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setErrorMessage(null);
      navigate('/');
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        setErrorMessage(t('badCredentialsErr'));
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
    <Box sx={{ mt: 10 }}>
      {registerSuccess && (
        <CustomSnackbar
          message={t('userCreatedAlert')}
          open={registerSuccess}
          onClose={() => setRegisterSucces(false)}
        />
      )}
      <Paper elevation={3} sx={{ maxWidth: 300, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <LoginForm onLogin={handleLogin} isPending={isPending} />
      </Paper>
      <NavigationBar />
    </Box>
  );
}
