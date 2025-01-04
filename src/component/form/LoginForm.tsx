import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { LoginData } from '../../interface/LoginData';

interface LoginFormProps {
  handleLogin: (loginData: LoginData) => void;
}
function LoginForm(loginForm: LoginFormProps) {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    loginForm.handleLogin(loginData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 300, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
      <Avatar sx={{ margin: 'auto', bgcolor: 'lightgray', color: 'black' }}>
        <LockIcon />
      </Avatar>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Grid2 container spacing={2}>
          <FormControl fullWidth>
            <TextField
              name="username"
              label="Username: "
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="password"
              label="Password: "
              onChange={handleChange}
              required
              variant="outlined"
              type="password"
              fullWidth
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember Me"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>

          <Box>
            <Link href="/login" underline="hover">
              Forgot Password ?
            </Link>
          </Box>

          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" component="span">
              Don&apos;t have an account?{' '}
            </Typography>
            <Link href="/login" underline="hover">
              Sign Up Here.
            </Link>
          </Box>
        </Grid2>
      </form>
    </Paper>
  );
}

export default LoginForm;
