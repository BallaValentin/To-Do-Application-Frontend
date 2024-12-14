import React, { useState, useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import { ToDo } from '../interface/ToDo';
import { GetToDos } from '../service/ToDoService';
import ToDoCard from '../component/card/ToDoCard';

export function TodoListPage() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

      <h1>List of Todos</h1>
      {todos.map((todo) => (
        <ToDoCard key={todo.id} toDo={todo} />
      ))}
    </Container>
  );
}
