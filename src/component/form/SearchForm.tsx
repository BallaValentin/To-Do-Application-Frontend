import { Box, Button, FormHelperText, Grid2, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToDoSearchParams } from '../../interface/ToDoSearchParams';

interface SearchFormProps {
  onSearch: (searchParams: ToDoSearchParams) => void;
}

function SearchForm(props: SearchFormProps) {
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    levelOfImportance: null,
    beforeDate: null,
    afterDate: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const searchParams: ToDoSearchParams = {
      levelOfImportance: filters.levelOfImportance,
      beforeDate: filters.beforeDate,
      afterDate: filters.afterDate,
    };
    props.onSearch(searchParams);
  };

  return (
    <Box>
      <Grid2
        container
        spacing={4}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}
      >
        <Grid2 size={2}>
          <TextField
            name="levelOfImportance"
            type="number"
            value={filters.levelOfImportance ?? ''}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <FormHelperText>{t('searchFormPriority')}</FormHelperText>
        </Grid2>
        <Grid2 size={3}>
          <TextField
            name="afterDate"
            type="date"
            value={filters.afterDate ?? ''}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <FormHelperText>{t('searchFormAfterDate')}</FormHelperText>
        </Grid2>
        <Grid2 size={3}>
          <TextField
            name="beforeDate"
            type="date"
            value={filters.beforeDate ?? ''}
            onChange={handleChange}
            variant="standard"
            fullWidth
          />
          <FormHelperText>{t('searchFormBeforeDate')}</FormHelperText>
        </Grid2>
        <Grid2 size={3}>
          <Button onClick={handleClick}>
            <SearchIcon />
            <Typography variant="body1">{t('searchFormSubmitBtn')}</Typography>
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default SearchForm;
