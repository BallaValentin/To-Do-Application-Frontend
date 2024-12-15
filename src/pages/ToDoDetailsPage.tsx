import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Typography } from '@mui/material';
import { ToDo } from '../interface/ToDo';
import { GetToDoById } from '../service/ToDoService';
import ToDoCardDetailed from '../component/card/ToDoCardDetailed';

export function ToDoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<ToDo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todoData = await GetToDoById(Number(id));
        setTodo(todoData);
      } catch (err) {
        console.error(`Failed to fetch todo with id ${id}: ${err}`);
        setError(`Failed to fetch todo with id ${id} from server. Try again later`);
      }
    };
    fetchTodo();
  }, [id]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ToDo details
      </Typography>

      {todo ? <ToDoCardDetailed toDo={todo} /> : <Typography variant="body1">Todo not found </Typography>}
    </Box>
  );
}
