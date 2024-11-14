import React, { useState } from 'react';
import AdviceCard from '../components/AdviceCard';
import { fetchRandomAdvice, fetchAdvicesByKeyword } from '../service/AdviceSlipApi';
import { Advice } from '../types/Advice';
import { Button, Box, Typography, Switch, FormControlLabel } from '@mui/material';

const AdviceProvider: React.FC = () => {
  const [adviceList, setAdviceList] = useState<Advice[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchKeywords, setSearchKeyWords] = useState('');
  const [filteredAdvicesList, setFilteredAdvicesList] = useState<Advice[]>([]);

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

  const filteredAdviceList = showFavorites ? adviceList.filter((advice) => favorites[advice.id]) : adviceList;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Advice Slip Application
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={(event) => setShowFavorites(event.target.checked)}
            color="primary"
          />
        }
        label="Show favorites only"
      />

      <Button variant="contained" color="primary" onClick={handleGetRandomAdvice}>
        Get Random Advice
      </Button>

      <Box sx={{ mt: 3 }}>
        {filteredAdviceList.map((advice) => (
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
