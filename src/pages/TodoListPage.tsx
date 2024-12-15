import React, { useState, useEffect } from 'react';
import { Alert, AlertColor, Box, Fab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { ToDo } from '../interface/ToDo';
import { GetToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';

export function TodoListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{ severity: AlertColor; message: string } | null>(null);

  useEffect(() => {
    if (location.state?.deleteAlert) {
      setDeleteAlert(location.state.deleteAlert);
    }
    const fetchTodos = async () => {
      try {
        const todoData = await GetToDos();
        setTodos(todoData);
      } catch (err) {
        console.error(`Failed to fetch todos: ${err}`);
        setError('Failed to fetch todos from server. Try again later');
      }
    };
    fetchTodos();
  }, []);

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}

      {deleteAlert && <Alert severity={deleteAlert.severity}>{deleteAlert.message}</Alert>}

      <h1>List of Todos</h1>
      {todos.map((todo) => (
        <ToDoCard key={todo.id} toDo={todo} />
      ))}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#007bff',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
        onClick={() => navigate('/todos/create')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
