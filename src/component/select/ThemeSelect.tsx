import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useTheme } from '../../context/MainThemeProvider';

type Theme = 'light' | 'dark' | 'winter';

function ThemeSelect() {
  const { themeName, setTheme } = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedTheme = event.target.value as Theme;
    setTheme(selectedTheme);
    localStorage.setItem('preferredTheme', selectedTheme);
  };

  return (
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
  );
}

export default ThemeSelect;
