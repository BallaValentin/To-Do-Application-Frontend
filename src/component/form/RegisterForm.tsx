import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { RegisterData } from '../../interface/RegisterData';

interface RegisterFormProps {
  onRegister: (registerData: RegisterData) => void;
}

interface RegisterFormError {
  usernameError: string;
  fullnameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
}

function RegisterForm(registerForm: RegisterFormProps) {
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  const [registerError, setRegisterError] = useState<RegisterFormError>({
    usernameError: '',
    fullnameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmitRegister = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid: boolean = true;

    const newErrors: RegisterFormError = {
      usernameError: '',
      fullnameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    if (!/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(registerData.username)) {
      isValid = false;
      newErrors.usernameError = 'Invalid username format.';
    }

    if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(registerData.fullname)) {
      isValid = false;
      newErrors.fullnameError = 'Must write your real name(ex. John Smith).';
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerData.email)) {
      isValid = false;
      newErrors.emailError = 'Invalid email address.';
    }

    if (passwordStrength !== 100) {
      isValid = false;
      newErrors.passwordError =
        'Password must be atleast 8 characters long and must contain uppercase, lowercase, digit and special characters.';
    }

    if (confirmPassword !== registerData.password) {
      isValid = false;
      newErrors.confirmPasswordError = 'Passwords must match.';
    }

    setRegisterError(newErrors);
    if (isValid) {
      registerForm.onRegister(registerData);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    let strength: number = 0;
    if (value.length >= 8) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[a-z]/.test(value)) strength += 25;
    if (/\d/.test(value)) strength += 15;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) strength += 10;
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
    <Box>
      <Avatar sx={{ margin: 'auto', bgcolor: 'lightgray', color: 'black' }}>
        <LockIcon />
      </Avatar>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmitRegister}>
        <Grid2 container spacing={2}>
          <FormControl fullWidth error={Boolean(registerError.usernameError)}>
            <TextField name="username" label="Username" onChange={handleChange} required variant="standard" fullWidth />
            {registerError.usernameError && <FormHelperText>{registerError.usernameError}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(registerError.fullnameError)}>
            <TextField
              name="fullname"
              label="Your Name"
              onChange={handleChange}
              required
              variant="standard"
              fullWidth
            />
            {registerError.fullnameError && <FormHelperText>{registerError.fullnameError}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(registerError.emailError)}>
            <TextField
              name="email"
              label="Email Address"
              onChange={handleChange}
              required
              variant="standard"
              fullWidth
            />
            {registerError.emailError && <FormHelperText>{registerError.emailError}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(registerError.passwordError)}>
            <TextField
              name="password"
              label="Password"
              onChange={handlePasswordChange}
              required
              variant="standard"
              type="password"
              fullWidth
            />
            {registerError.passwordError && <FormHelperText>{registerError.passwordError}</FormHelperText>}

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

          <FormControl fullWidth error={Boolean(registerError.confirmPasswordError)}>
            <TextField
              name="confirm-password"
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="standard"
              type="password"
              fullWidth
            />
            {registerError.confirmPasswordError && (
              <FormHelperText>{registerError.confirmPasswordError}</FormHelperText>
            )}
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
    </Box>
  );
}

export default RegisterForm;
