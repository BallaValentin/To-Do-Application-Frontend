import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ToDo } from '../../interface/ToDo';

interface ToDoCardProps {
  toDo: ToDo;
}

function ToDoCard({ toDo }: ToDoCardProps) {
  const { t } = useTranslation();

  return (
    <Card sx={{ m: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {toDo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/todos/${toDo.id}`}>
          {t('todoCardBtn')}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ToDoCard;
