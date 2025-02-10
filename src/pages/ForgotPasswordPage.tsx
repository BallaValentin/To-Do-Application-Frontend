import { Alert, Box, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ForgotPasswordForm from '../component/form/ForgotPasswordForm';
import NavigationBar from '../component/navigation/NavigationBar';
import { ForgotPasswordData } from '../interface/ForgotPasswordData';
import { sendForgotPasswordEmail } from '../service/UserService';
import CustomSnackbar from '../component/snackbar/CustomSnackbar';

export function ForgotPasswordPage() {
  const [tooManyRequest, setTooManyRequest] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: (forgotPasswordData: ForgotPasswordData) => sendForgotPasswordEmail(forgotPasswordData),
    onSuccess: () => {
      setSuccess(true);
    },
    onError(error: AxiosError) {
      if (error.response?.status === 429) {
        setTooManyRequest(true);
      }
    },
  });

  const handleSubmit = (email: ForgotPasswordData) => {
    mutate(email);
  };

  return (
    <Box sx={{ mt: 30 }}>
      {success && <CustomSnackbar message={t('emailSentSuccess')} open={success} onClose={() => setSuccess(false)} />}
      <Paper elevation={3} sx={{ maxWidth: 550, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
        <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />
        {tooManyRequest && (
          <Alert sx={{ mt: 2 }} severity="error">
            {t('tooManyEmailSent')}
          </Alert>
        )}
      </Paper>
      <NavigationBar />
    </Box>
  );
}
