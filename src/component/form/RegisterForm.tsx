import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid2,
  LinearProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { RegisterData } from '../../interface/RegisterData';

interface RegisterFormProps {
  handleRegister: (registerData: RegisterData) => void;
}
function RegisterForm(registerForm: RegisterFormProps) {
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    registerForm.handleRegister(registerData);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    let strength: number = 0;
    if (value.length >= 8) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[a-z]/.test(value)) strength += 25;
    if (/\d/.test(value)) strength += 15;
    if (/[!@#$%^&*]/.test(value)) strength += 10;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'inherit';
    if (passwordStrength < 50) return 'error';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Leak';
    if (passwordStrength < 100) return 'Almost Peak';
    return 'Peak';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 300, margin: 'auto', padding: 4, textAlign: 'center', marginTop: 10 }}>
      <Avatar sx={{ margin: 'auto', bgcolor: 'lightgray', color: 'black' }}>
        <LockIcon />
      </Avatar>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Sign up
      </Typography>
      <form onSubmit={handleLogin}>
        <Grid2 container spacing={2}>
          <FormControl fullWidth>
            <TextField name="username" label="Username" onChange={handleChange} required variant="standard" fullWidth />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="fullname"
              label="Your Name"
              onChange={handleChange}
              required
              variant="standard"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="email"
              label="Email Address"
              onChange={handleChange}
              required
              variant="standard"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="password"
              label="Password"
              onChange={handlePasswordChange}
              required
              variant="standard"
              type="password"
              fullWidth
            />

            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{ mt: 1, height: 5, borderRadius: 5 }}
              color={getPasswordStrengthColor()}
            />
            <Typography variant="body2" color={getPasswordStrengthColor()} sx={{ textAlign: 'left' }}>
              {getPasswordStrengthLabel()}
            </Typography>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="confirm-password"
              label="Confirm Password"
              onChange={handleChange}
              required
              variant="standard"
              type="password"
              fullWidth
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>

          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" component="span">
              Already have an account?{' '}
            </Typography>
            <Link href="/login" underline="hover">
              Sign In.
            </Link>
          </Box>
        </Grid2>
      </form>
    </Paper>
  );
}

export default RegisterForm;
