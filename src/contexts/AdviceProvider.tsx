import React, { useState } from 'react';
import AdviceCard from '../components/AdviceCard';
import { fetchRandomAdvice } from '../service/AdviceSlipApi';
import { Advice } from '../types/Advice';
import { Button, Box, Typography } from '@mui/material';

const AdviceProvider: React.FC = () => {
  const [adviceList, setAdviceList] = useState<Advice[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const handleGetRandomAdvice = async () => {
    try {
      const newAdvice = await fetchRandomAdvice();
      setAdviceList((prevList) => {
        if (prevList.some((advice) => advice.id === newAdvice.id)) {
          return prevList;
        }
        return [...prevList, newAdvice];
      });
    } catch (error) {
      console.error('Failed to fetch advice: ', error);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      updatedFavorites[id] = !updatedFavorites[id];
      return updatedFavorites;
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Advice Slip Application
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGetRandomAdvice}>
        Get Random Advice
      </Button>

      <Box sx={{ mt: 3 }}>
        {adviceList.map((advice) => (
          <AdviceCard
            key={advice.id}
            advice={advice}
            isFavorite={!!favorites[advice.id]}
            toggleFavorite={() => toggleFavorite(advice.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AdviceProvider;
