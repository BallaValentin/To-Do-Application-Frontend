import { Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToDoDetailResponse } from '../../interface/ToDoDetailResponse';

interface ToDoDetailCardProps {
  toDoDetail: ToDoDetailResponse;
  onClick: () => void;
}

function ToDoDetailCard({ toDoDetail, onClick }: ToDoDetailCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        width: 300,
        minHeight: 100,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {toDoDetail.text}
        </Typography>
      </CardContent>

      <IconButton
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
        }}
        onClick={onClick}
      >
        <DeleteIcon color="error" />
      </IconButton>
    </Card>
  );
}

export default ToDoDetailCard;
