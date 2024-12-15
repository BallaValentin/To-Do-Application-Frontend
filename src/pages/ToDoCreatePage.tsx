import { Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ToDoForm from '../component/form/ToDoForm';
import { CreateToDo } from '../service/ToDoService';
import { ToDo } from '../interface/ToDo';

export function ToDoCreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleCreateToDo = async (formData: ToDo) => {
    try {
      const todoData = await CreateToDo(formData);
      navigate(`/todos/${todoData.id}`, {
        state: { success: `To do with id ${todoData.id} successfully created` },
      });
    } catch (err) {
      console.error(`Failed to create new todo: ${err}`);
      setError('Failed to create new ToDo. Try again later');
    }
  };
  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
      <ToDoForm onSubmit={handleCreateToDo} />
    </Box>
  );
}
