import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ToDoForm from '../component/form/ToDoForm';

export function ToDoUpdatePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <ToDoForm />
    </Box>
  );
}
