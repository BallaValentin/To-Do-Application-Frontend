import { Box, Button, IconButton, Modal, TextField, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { ToDoDetail } from '../../interface/ToDoDetail';

interface ToDoDetailModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (toDoDetail: ToDoDetail) => void;
}

function ToDoDetailModal(toDoDetailModelProps: ToDoDetailModalProps) {
  const currentTheme = useTheme();
  const [text, setText] = useState<string>('');
  const toDoDetail = {
    text: '',
  };

  const handleSubmit = () => {
    toDoDetail.text = text;
    toDoDetailModelProps.onSubmit(toDoDetail);
  };

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
            backgroundColor: currentTheme.palette.background.paper,
            textAlign: 'center',
            boxShadow: 24,
            position: 'relative',
            pb: 1,
            width: 400,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ mt: 0.5, ml: 1 }}>
                Add Detail
              </Typography>
              <IconButton onClick={toDoDetailModelProps.onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ pl: 1, pr: 1 }}>
              <TextField
                fullWidth
                label="Enter Text"
                variant="standard"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Box>

            <Button variant="contained" type="submit" color="primary" sx={{ mt: 3 }}>
              Submit Detail
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default ToDoDetailModal;
