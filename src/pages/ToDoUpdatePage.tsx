import { Alert, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ToDoForm from '../component/form/ToDoForm';
import { ToDo } from '../interface/ToDo';
import { GetToDoById, UpdateToDoById } from '../service/ToDoService';

export function ToDoUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        await GetToDoById(Number(id));
      } catch (err) {
        console.error(`Failed to fetch todo with id ${id}: ${err}`);
        navigate('/', {
          state: { error: `Failed to fetch todo with id ${id} from server. Try again later` },
        });
      }
    };
    fetchTodo();
  }, [id]);

  const handleUpdateToDo = async (formData: ToDo) => {
    try {
      const todoData = await UpdateToDoById(Number(id), formData);
      navigate(`/todos/${todoData.id}`, {
        state: {
          success: `To do with id ${todoData.id} successfully updated`,
        },
      });
    } catch (err) {
      console.error(`Failed to update todo with id ${id}: ${err}`);
      setError(`Failed to update todo with id ${id}. Try again later`);
    }
  };

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
      <ToDoForm onSubmit={handleUpdateToDo} />
    </Box>
  );
}
