import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ToDo } from '../../interface/ToDo';

interface ToDoCardDetailedProps {
  toDo: ToDo;
}

function ToDoCardDetailed({ toDo }: ToDoCardDetailedProps) {
  return (
    <Card sx={{ m: 10, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {toDo.title}
        </Typography>
        <Typography variant="body1">
          <strong>Description: </strong>
          {toDo.description}
        </Typography>
        <Typography variant="body1">
          <strong>Due date: </strong>
          {new Date(toDo.dueDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Level of Importance: </strong>
          {toDo.levelOfImportance}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ToDoCardDetailed;
