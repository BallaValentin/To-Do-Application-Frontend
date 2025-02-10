import { Box, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavigationBar from '../component/navigation/NavigationBar';
import NewPasswordForm from '../component/form/NewPasswordForm';
import { NewPasswordData } from '../interface/NewPasswordData';
import { changePassword } from '../service/UserService';

export function NewPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const { mutate, isPending } = useMutation({
    mutationFn: (newPasswordData: NewPasswordData) => changePassword(newPasswordData, token),
    onSuccess: () => {
      console.log('Success');
      navigate('/login');
    },
  });
  const handleSubmit = (newPasswordData: NewPasswordData) => {
    mutate(newPasswordData);
  };

  return (
    <Box sx={{ mt: 20 }}>
      <Paper elevation={3} sx={{ maxWidth: 550, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
        <NewPasswordForm onSubmit={handleSubmit} isPending={isPending} />
      </Paper>
      <NavigationBar />
    </Box>
  );
}
