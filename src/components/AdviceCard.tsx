import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Advice } from '../types/Advice';

interface AdviceCardProps {
  advice: Advice;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

function AdviceCard({ advice, isFavorite, toggleFavorite }: AdviceCardProps) {
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
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default AdviceCard;
