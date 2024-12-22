import { Box, CircularProgress, Typography } from '@mui/material';

interface ProgressCircleProps {
  loadingMessage: string;
}

function ProgressCircle(progressCircleProps: ProgressCircleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {progressCircleProps.loadingMessage}
      </Typography>
    </Box>
  );
}

export default ProgressCircle;
