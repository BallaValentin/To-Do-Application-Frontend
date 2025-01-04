import { Box } from '@mui/material';
import LoginForm from '../component/form/LoginForm';

export function LoginPage() {
  const handleLogin = () => {};
  return (
    <Box>
      <LoginForm handleLogin={handleLogin} />
    </Box>
  );
}
