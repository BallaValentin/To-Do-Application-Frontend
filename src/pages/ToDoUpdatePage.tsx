import { Alert, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ToDoForm from '../component/form/ToDoForm';
import { ToDo } from '../interface/ToDo';
import { UpdateToDoById } from '../service/ToDoService';

export function ToDoUpdatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleUpdateToDo = async (formData: ToDo) => {
    try {
      const todoData = await UpdateToDoById(Number(id), formData);
      navigate(`/todos/${todoData.id}`);
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
