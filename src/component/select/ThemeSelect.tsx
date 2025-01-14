import { Box, CssBaseline, MenuItem, Select, SelectChangeEvent, ThemeProvider } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useState } from 'react';
import themes from '../../theme/themes';

function ThemeSelect() {
  const [themeName, setThemeName] = useState<'light' | 'dark' | 'winter'>('light');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedTheme = event.target.value as 'light';
    setThemeName(selectedTheme);
    localStorage.setItem('preferredTheme', selectedTheme);
  };

  return (
    <ThemeProvider theme={themes[themeName]}>
      <CssBaseline />
      <Box>
        <Select value={themeName} onChange={handleChange}>
          <MenuItem value="light">
            Light Mode
            <LightModeIcon sx={{ ml: 1 }} />
          </MenuItem>
          <MenuItem value="dark">
            Dark Mode
            <DarkModeIcon sx={{ ml: 1 }} />
          </MenuItem>
          <MenuItem value="winter">
            Winter Mode
            <AcUnitIcon sx={{ ml: 1 }} />
          </MenuItem>
        </Select>
      </Box>
    </ThemeProvider>
  );
}

export default ThemeSelect;
