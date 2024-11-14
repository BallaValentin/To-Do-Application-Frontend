import React from 'react';
import { Card, CardContent, Typography, IconButton, Icon } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Advice } from '../types/Advice';

interface AdviceCardProps {
  advice: Advice;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ advice, isFavorite, toggleFavorite }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 'auto', mt: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Advice #{advice.id}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
          {advice.advice}
        </Typography>
        <IconButton onClick={toggleFavorite} color={isFavorite ? 'error' : 'default'}>
          <FavoriteIcon></FavoriteIcon>
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default AdviceCard;
