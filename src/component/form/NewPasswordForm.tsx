import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LockIcon from '@mui/icons-material/Lock';
import { NewPasswordData } from '../../interface/NewPasswordData';

interface NewPasswordProps {
  onSubmit: (newPasswordData: NewPasswordData) => void;
  isPending: boolean;
}

function NewPasswordForm(props: NewPasswordProps) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordError('');
    setConfirmPasswordError('');
    let isValid = true;

    if (passwordStrength !== 100) {
      isValid = false;
      setPasswordError(t('registerFormPasswordErr'));
    }

    if (confirmPassword !== newPassword) {
      isValid = false;
      setConfirmPasswordError(t('registerFormConfirmPwdErr'));
    }

    if (isValid) {
      const newPasswordData: NewPasswordData = {
        newPassword,
      };
      props.onSubmit(newPasswordData);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);

    let strength: number = 0;
    if (newPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(newPassword)) strength += 25;
    if (/[a-z]/.test(newPassword)) strength += 25;
    if (/\d/.test(newPassword)) strength += 15;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)) strength += 10;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'inherit';
    if (passwordStrength < 50) return 'error';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return t('registerFormVeryWeakPwd');
    if (passwordStrength < 50) return t('registerFormWeakPwd');
    if (passwordStrength < 75) return t('registerFormBitWeakPwd');
    if (passwordStrength < 100) return t('registerFormAlmostPwd');
    return t('registerFormGoodPwd');
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Avatar sx={{ margin: 'auto', bgcolor: 'lightgray', color: 'black' }}>
          <LockIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          {t('newPasswordFormTitle')}
        </Typography>
        <Grid2>
          <FormControl fullWidth error={Boolean(passwordError)}>
            <TextField
              name="password"
              label={t('registerFormPassword')}
              onChange={handlePasswordChange}
              required
              variant="standard"
              type="password"
              fullWidth
            />
            {passwordError && <FormHelperText>{passwordError}</FormHelperText>}

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

          <FormControl fullWidth error={Boolean(confirmPasswordError)}>
            <TextField
              name="confirm-password"
              label={t('registerFormConfirmPwd')}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="standard"
              type="password"
              fullWidth
            />
            {confirmPasswordError && <FormHelperText>{confirmPasswordError}</FormHelperText>}
          </FormControl>

          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" disabled={props.isPending} fullWidth>
              {props.isPending ? t('newPasswordFormBtnPending') : t('newPasswordFormBtn')}
            </Button>
          </Box>
        </Grid2>
      </form>
    </Box>
  );
}

export default NewPasswordForm;
