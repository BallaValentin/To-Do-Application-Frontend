import { Box, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useTheme } from '../../context/MainThemeProvider';

type Theme = 'light' | 'dark' | 'winter';

function ToggleThemeButton() {
  const { themeName, setTheme } = useTheme();

  const themes = ['light' as Theme, 'dark' as Theme, 'winter' as Theme];
  const themeIcons = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
    winter: <AcUnitIcon />,
  };

  const handleToggleTheme = () => {
    const currentIndex = themes.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themes.length;
    const selectedTheme = themes[nextIndex];
    setTheme(selectedTheme);
    localStorage.setItem('preferredTheme', selectedTheme);
  };

  return (
    <Box>
      <IconButton onClick={handleToggleTheme}>{themeIcons[themeName]}</IconButton>
    </Box>
  );
}

export default ToggleThemeButton;
