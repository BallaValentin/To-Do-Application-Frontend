import React, { useState, useEffect } from 'react';
import { Alert, AlertColor, Container } from '@mui/material';
import { ToDo } from '../interface/ToDo';
import { GetToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';
import { useLocation } from 'react-router-dom';

export function TodoListPage() {
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
    <Container>
      {error && <Alert severity="error">{error}</Alert>}

      {deleteAlert && <Alert severity={deleteAlert.severity}>{deleteAlert.message}</Alert>}

      <h1>List of Todos</h1>
      {todos.map((todo) => (
        <ToDoCard key={todo.id} toDo={todo} />
      ))}
    </Container>
  );
}
