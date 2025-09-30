import { Box, IconButton, Slide, SlideProps, Snackbar, SnackbarCloseReason } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

function CustomSnackbar(props: SnackbarProps) {
  const [open, setOpen] = useState<boolean>(props.open);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    props.onClose();
  };

  const slideTransition = (transitionProps: SlideProps) => {
    return <Slide {...transitionProps} direction="up" />;
  };

  return (
    <Box>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
        message={props.message}
        action={
          <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
        TransitionComponent={slideTransition}
      />
    </Box>
  );
}

export default CustomSnackbar;
