import { Avatar, Box, Button, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react';
import { ForgotPasswordData } from '../../interface/ForgotPasswordData';

interface ForgotPasswordProps {
  onSubmit: (email: ForgotPasswordData) => void;
  isPending: boolean;
}

function ForgotPasswordForm(props: ForgotPasswordProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSubmitEmail = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      isValid = false;
      setEmailError(t('registerFormEmailErr'));
    }

    if (isValid) {
      const forgotPasswordData: ForgotPasswordData = {
        email,
      };
      props.onSubmit(forgotPasswordData);
    }
  };

  return (
    <Box>
      <Avatar sx={{ margin: 'auto', bgcolor: 'lightgray', color: 'black' }}>
        <LockIcon />
      </Avatar>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        {t('forgotPasswordFormTitle')}
      </Typography>
      <form onSubmit={handleSubmitEmail}>
        <FormControl fullWidth error={Boolean(emailError)}>
          <TextField
            name="email"
            label={t('forgotPasswordFormEmail')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            required
            variant="standard"
            fullWidth
          />
          {emailError && <FormHelperText>{emailError}</FormHelperText>}
        </FormControl>

        <Box sx={{ mt: 4, alignItems: 'right' }}>
          <Button type="submit" variant="contained" color="primary" disabled={props.isPending} fullWidth>
            {props.isPending ? t('forgotPasswordBtnPending') : t('forgotPasswordFormBtn')}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ForgotPasswordForm;
