import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { LoginData } from '../../interface/LoginData';

interface LoginFormProps {
  isPending: boolean;
  onLogin: (loginData: LoginData) => void;
}
function LoginForm(loginForm: LoginFormProps) {
  const { t } = useTranslation();

  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    loginForm.onLogin(loginData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Avatar sx={{ margin: 'auto', bgcolor: 'lightgray', color: 'black' }}>
        <LockIcon />
      </Avatar>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        {t('loginFormTitle')}
      </Typography>
      <form onSubmit={handleSubmitLogin}>
        <Grid2 container spacing={2}>
          <FormControl fullWidth>
            <TextField
              name="username"
              label={t('loginFormUsername')}
              onChange={handleChange}
              required
              variant="standard"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="password"
              label={t('loginFormPassword')}
              onChange={handleChange}
              required
              variant="standard"
              type="password"
              fullWidth
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRememberMe(e.target.checked);
                  loginData.rememberMe = e.target.checked;
                }}
                color="primary"
              />
            }
            label={t('loginFormRememberMe')}
          />

          <Button type="submit" variant="contained" color="primary" disabled={loginForm.isPending} fullWidth>
            {loginForm.isPending ? t('loginFormPendingLoginBtn') : t('loginFormLoginBtn')}
          </Button>

          <Box>
            <Link href="/forgot-password" underline="hover">
              {t('loginFormPwdForgot')}
            </Link>
          </Box>

          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" component="span">
              {t('loginFormNoAccount')}
            </Typography>
            <Link href="/register" underline="hover">
              {t('loginFormSignUp')}
            </Link>
          </Box>
        </Grid2>
      </form>
    </Box>
  );
}

export default LoginForm;
