import { Box, Button, FormHelperText, Grid2, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface SearchFormProps {
  onSearch: () => void;
}

function SearchForm(props: SearchFormProps) {
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
          <FormHelperText>Priority</FormHelperText>
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
          <FormHelperText>After date</FormHelperText>
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
          <FormHelperText>Before date</FormHelperText>
        </Grid2>
        <Grid2 size={3}>
          <Button onClick={props.onSearch}>
            <SearchIcon />
            <Typography variant="body1">Search Todos</Typography>
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default SearchForm;
