import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignText: 'center',
        bgColor: 'f5f5f5',
      }}
    >
      <Typography variant="h3" component="h1" color="error" gutterBottom>
        401 Unauthorized
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        You don&apos;t have permission to view this page
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go To Main Page
      </Button>
    </Box>
  );
}
