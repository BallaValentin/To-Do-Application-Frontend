import { Box, Button, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TokenExpiredModalProps {
  isInvalidToken: boolean;
}

function TokenExpiredModal({ isInvalidToken }: TokenExpiredModalProps) {
  const navigate = useNavigate();
  return (
    <Box>
      <Modal
        open={isInvalidToken}
        onClose={() => {}}
        aria-labelledby="token-expired-modal"
        aria-describedby="token-expired-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'middle' }}
      >
        <Typography id="token-expired-modal" variant="h6" component="h2">
          Your session has expired.
          <Typography id="token-expired-description" sx={{ mt: 2 }}>
            Please log in again to continue.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              localStorage.removeItem('jwtToken');
              navigate('/login');
            }}
            sx={{ mt: 3 }}
          >
            Go To Login
          </Button>
        </Typography>
      </Modal>
    </Box>
  );
}

export default TokenExpiredModal;
