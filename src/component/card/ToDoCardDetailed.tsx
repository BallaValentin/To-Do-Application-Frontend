import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ToDoResponse } from '../../interface/ToDoResponse';

interface ToDoCardDetailedProps {
  toDo: ToDoResponse;
  handleDelete: () => void;
}

function ToDoCardDetailed({ toDo, handleDelete }: ToDoCardDetailedProps) {
  const navigate = useNavigate();

  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub?.split('-')[0];
      setIsOwner(username === toDo.createdBy);
    }
  });

  const handleUpdate = () => {
    navigate(`/todos/update/${toDo.id}`);
  };

  return (
    <Card sx={{ m: 10, backgroundColor: '#f5f5f5', position: 'relative' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {toDo.title}
        </Typography>
        <Typography variant="body1">
          <strong>Created by: </strong>
          {toDo.createdBy}
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
      {isOwner && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            gap: 1,
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
          }}
        >
          <IconButton
            onClick={handleDelete}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            onClick={handleUpdate}
            sx={{
              backgroundColor: 'blue',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkblue',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}

export default ToDoCardDetailed;
