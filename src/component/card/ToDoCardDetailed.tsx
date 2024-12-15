import { Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ToDo } from '../../interface/ToDo';
import { DeleteToDoById } from '../../service/ToDoService';

interface ToDoCardDetailedProps {
  toDo: ToDo;
}

function ToDoCardDetailed({ toDo }: ToDoCardDetailedProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const status = await DeleteToDoById(toDo.id);
      if (status === 204) {
        navigate('/', {
          state: { deleteAlert: { severity: 'success', message: `To do with id ${toDo.id} deleted succesfully` } },
        });
      } else {
        navigate('/', {
          state: { deleteAlert: { severity: 'error', message: `To do with id ${toDo.id} doesnt exist` } },
        });
      }
    } catch (err) {
      console.log(`Failed to delete todo with id ${toDo.id}: ${err}`);
      navigate('/', {
        state: { error: 'Failed to delete todo. Try again later' },
      });
    }
  };

  return (
    <Card sx={{ m: 10, backgroundColor: '#f5f5f5', position: 'relative' }}>
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
      <IconButton
        onClick={handleDelete}
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          backgroundColor: 'red',
          color: 'white',
          '&:hover': {
            backgroundColor: 'darkred',
          },
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}

export default ToDoCardDetailed;
