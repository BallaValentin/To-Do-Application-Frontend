import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
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
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>{t('todoDetailedCardDueDate')}</strong>
            {new Date(toDo.dueDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>{t('todoDetailedCardPriority')}</strong>
            {toDo.levelOfImportance}
          </Typography>
        </Box>
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
