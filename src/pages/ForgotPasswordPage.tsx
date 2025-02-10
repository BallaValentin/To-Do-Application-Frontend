import { Box, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import ForgotPasswordForm from '../component/form/ForgotPasswordForm';
import NavigationBar from '../component/navigation/NavigationBar';
import { ForgotPasswordData } from '../interface/ForgotPasswordData';
import { sendForgotPasswordEmail } from '../service/UserService';

export function ForgotPasswordPage() {
  const { mutate, isPending } = useMutation({
    mutationFn: (forgotPasswordData: ForgotPasswordData) => sendForgotPasswordEmail(forgotPasswordData),
    onSuccess: () => {
      console.log('Email Sent');
    },
  });

  const handleSubmit = (email: ForgotPasswordData) => {
    mutate(email);
  };

  return (
    <Box sx={{ mt: 30 }}>
      <Paper elevation={3} sx={{ maxWidth: 550, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
        <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />
      </Paper>
      <NavigationBar />
    </Box>
  );
}
