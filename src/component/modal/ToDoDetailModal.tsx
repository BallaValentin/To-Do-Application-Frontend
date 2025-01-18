import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface ToDoDetailModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function ToDoDetailModal(toDoDetailModelProps: ToDoDetailModalProps) {
  const [text, setText] = useState<string>('');

  return (
    <Box>
      <Modal
        open={toDoDetailModelProps.open}
        onClose={() => {}}
        aria-describedby="token-expired-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2 }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            textAlign: 'center',
            boxShadow: 24,
            position: 'relative',
            pb: 1,
            width: 400,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={toDoDetailModelProps.onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ pl: 1, pr: 1 }}>
            <TextField
              fullWidth
              label="Enter Text"
              variant="standard"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>

          <Button variant="contained" color="primary" onClick={toDoDetailModelProps.onSubmit} sx={{ mt: 3 }}>
            Submit Detail
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ToDoDetailModal;
