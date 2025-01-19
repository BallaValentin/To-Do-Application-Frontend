import { createTheme, Theme } from '@mui/material';

const themes: { light: Theme; dark: Theme; winter: Theme } = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '##90caf9',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a1a1a',
          },
        },
      },
    },
  }),
  winter: createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#e3f2fd',
        paper: '#bbdefb',
      },
      primary: {
        main: '#00acc1',
      },
    },
  }),
};

export default themes;
