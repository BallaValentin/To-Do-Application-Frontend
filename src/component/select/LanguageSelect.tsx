import { Avatar, Box, ListItemIcon, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

function LanguageSelect() {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <Box>
      <Select value={language} onChange={handleChange}>
        <MenuItem value="en">
          <ListItemIcon sx={{ mr: 1 }}>
            <Avatar sx={{ width: 30, height: 30 }}>
              <Flag code="US" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Avatar>
          </ListItemIcon>
          English
        </MenuItem>
        <MenuItem value="ro">
          <ListItemIcon sx={{ mr: 1 }}>
            <Avatar sx={{ width: 30, height: 30 }}>
              <Flag code="RO" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Avatar>
          </ListItemIcon>
          Română
        </MenuItem>
        <MenuItem value="hu">
          <ListItemIcon sx={{ mr: 1 }}>
            <Avatar sx={{ width: 30, height: 30 }}>
              <Flag code="HU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Avatar>
          </ListItemIcon>
          Magyar
        </MenuItem>
      </Select>
    </Box>
  );
}

export default LanguageSelect;
