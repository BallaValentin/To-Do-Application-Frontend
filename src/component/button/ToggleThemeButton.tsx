import { Box, IconButton, Tooltip, tooltipClasses } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useTheme } from '../../context/MainThemeProvider';
import { Theme } from '../../interface/ThemeMode';

function ToggleThemeButton() {
  const { themeName, setTheme } = useTheme();

  const themes = ['light' as Theme, 'dark' as Theme, 'winter' as Theme];

  const themeIcons = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
    winter: <AcUnitIcon />,
  };

  const toggleTexts = {
    light: 'Toggle dark mode',
    dark: 'Toggle winter mode',
    winter: 'Toggle light mode',
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
      <Tooltip
        arrow
        title={toggleTexts[themeName]}
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
                marginTop: '0px',
              },
              [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
                marginBottom: '0px',
              },
              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
                marginLeft: '0px',
              },
              [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
                marginRight: '0px',
              },
            },
          },
        }}
      >
        <IconButton onClick={handleToggleTheme}>{themeIcons[themeName]}</IconButton>
      </Tooltip>
    </Box>
  );
}

export default ToggleThemeButton;
