import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ToDoForm from '../component/form/ToDoForm';
import { createToDo } from '../service/ToDoService';
import { ToDo } from '../interface/ToDo';
import { ToDoResponse } from '../interface/ToDoResponse';
import TokenExpiredModal from '../component/modal/TokenExpiredModal';

export function ToDoCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isInvalidToken, setIsInvalidToken] = useState(false);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) {
      navigate('/unauthorized');
    } else {
      console.log(`There is a token: ${token}`);
      try {
        const decodedToken = jwtDecode(token);
        console.log(`Decoded: ${decodedToken}`);
        if (decodedToken.exp) {
          const isExpired = decodedToken.exp * 1000 < Date.now();
          if (isExpired) {
            setIsInvalidToken(true);
          }
        } else {
          setIsInvalidToken(true);
        }
      } catch (err) {
        console.error(err);
        navigate('/unauthorized');
      }
    }
  }, [token, navigate]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createToDo,
    onSuccess: (createdTodo: ToDoResponse) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate(`/todos/${createdTodo.id}`, {
        state: {
          success: `To do with id ${createdTodo.id} created successfully`,
        },
      });
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });

  const handleCreateToDo = (formData: ToDo) => {
    mutate(formData);
  };

  return (
    <Box>
      {isError && <Alert severity="error">{(error as Error).message}</Alert>}
      <ToDoForm onSubmit={handleCreateToDo} />
      {isPending && <Typography variant="body1">Creating todo...</Typography>}

      <TokenExpiredModal isInvalidToken={isInvalidToken} />
    </Box>
  );
}
