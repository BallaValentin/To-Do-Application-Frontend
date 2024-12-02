import React, { useState } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, Alert } from '@mui/material';

import AdviceCard from '../components/AdviceCard';
import { fetchRandomAdvice, fetchAdvicesByKeyword } from '../service/AdviceSlipApi';
import { Advice } from '../types/Advice';

function AdviceProvider() {
  const [adviceList, setAdviceList] = useState<Advice[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchKeyword, setSearchKeyWord] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const handleGetRandomAdvice = async () => {
    try {
      setErrorMessage(null);
      setIsErrorVisible(false);
      const newAdvice = await fetchRandomAdvice();
      setAdviceList((prevList) => {
        if (prevList.some((advice) => advice.id === newAdvice.id)) {
          return prevList;
        }
        return [...prevList, newAdvice];
      });
    } catch (error) {
      setErrorMessage('Failed to fetch advice. Please try again.');
      setIsErrorVisible(true);
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

  const displayAdviceList = showFavorites ? adviceList.filter((advice) => favorites[advice.id]) : adviceList;

  const handleSearchByKeyword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setErrorMessage(null);
      setIsErrorVisible(false);
      const results = await fetchAdvicesByKeyword(searchKeyword);
      setAdviceList(results);
    } catch (error) {
      setErrorMessage('Failed to fetch advices by keyword. Please try again.');
      setIsErrorVisible(true);
      console.error('Failed to fetch advices by keyword: ', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {isErrorVisible && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error" onClose={() => setIsErrorVisible(false)}>
            {errorMessage}
          </Alert>
        </Box>
      )}

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
        <form onSubmit={handleSearchByKeyword}>
          <TextField
            label="Search by Keyword"
            variant="outlined"
            fullWidth
            value={searchKeyword}
            onChange={(event) => setSearchKeyWord(event.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Search
          </Button>
        </form>
      </Box>

      <Box sx={{ mt: 3 }}>
        {displayAdviceList.length === 0 ? (
          <Typography>No advice available.</Typography>
        ) : (
          displayAdviceList.map((advice) => (
            <AdviceCard
              key={advice.id}
              advice={advice}
              isFavorite={!!favorites[advice.id]}
              toggleFavorite={() => toggleFavorite(advice.id)}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

export default AdviceProvider;
