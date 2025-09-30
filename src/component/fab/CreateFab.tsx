import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CreateFabProps {
  onClick: () => void;
}

function CreateFab(createFabProps: CreateFabProps) {
  return (
    <Box>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#007bff',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
        onClick={createFabProps.onClick}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default CreateFab;
