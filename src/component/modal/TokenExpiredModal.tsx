import { Box, Button, Divider, Modal, Typography } from '@mui/material';
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
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2 }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            textAlign: 'center',
            boxShadow: 24,
            position: 'relative',
            pt: 4,
            pb: 4,
            width: 700,
          }}
        >
          <Typography id="token-expired-modal" variant="h6" component="h2" fontSize="2rem">
            Session Expired
            <Divider />
            <Typography id="token-expired-description" sx={{ mt: 2, mb: 2 }}>
              Your session has expired. Please log in again to continue.
            </Typography>
            <Divider />
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
        </Box>
      </Modal>
    </Box>
  );
}

export default TokenExpiredModal;
