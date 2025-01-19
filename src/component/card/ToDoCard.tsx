import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ToDo } from '../../interface/ToDo';

interface ToDoCardProps {
  toDo: ToDo;
}

function ToDoCard({ toDo }: ToDoCardProps) {
  return (
    <Card sx={{ m: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {toDo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/todos/${toDo.id}`}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ToDoCard;
