import { Card, CardContent, Typography } from '@mui/material';
import { ToDoDetailResponse } from '../../interface/ToDoDetailResponse';

interface ToDoDetailCardProps {
  toDoDetail: ToDoDetailResponse;
}

function ToDoDetailCard({ toDoDetail }: ToDoDetailCardProps) {
  return (
    <Card
      sx={{
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
    </Card>
  );
}

export default ToDoDetailCard;
