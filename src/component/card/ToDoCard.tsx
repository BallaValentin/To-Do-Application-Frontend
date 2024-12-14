import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ToDo } from '../../interface/ToDo';

interface ToDoCardProps {
  toDo: ToDo;
}

function ToDoCard({ toDo }: ToDoCardProps) {
  return (
    <Card sx={{ m: 10, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {toDo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Details</Button>
      </CardActions>
    </Card>
  );
}

export default ToDoCard;
