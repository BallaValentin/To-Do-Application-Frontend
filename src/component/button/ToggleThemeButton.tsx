import { Box, IconButton, Tooltip, tooltipClasses } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/MainThemeProvider';
import { ThemeMode } from '../../interface/ThemeMode';

function ToggleThemeButton() {
  const { t } = useTranslation();
  const { themeName, setTheme } = useTheme();

  const themes = ['light' as ThemeMode, 'dark' as ThemeMode, 'winter' as ThemeMode];

  const themeIcons = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
    winter: <AcUnitIcon />,
  };

  const toggleTexts = {
    light: t('tooltipThemeLight'),
    dark: t('tooltipThemeDark'),
    winter: t('tooltipThemeWinter'),
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
