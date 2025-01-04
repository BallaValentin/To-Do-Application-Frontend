import { Box } from '@mui/material';
import RegisterForm from '../component/form/RegisterForm';

export function RegisterPage() {
  const handleRegister = () => {};
  return (
    <Box>
      <RegisterForm handleRegister={handleRegister} />
    </Box>
  );
}
