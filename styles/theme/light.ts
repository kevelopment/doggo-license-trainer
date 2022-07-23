import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6D9384'
    },
    secondary: {
      main: '#E1A080'
    },
    background: {
      default: '#C6D5CC',
      paper: '#F4F0E4'
    },
  }
});

export default lightTheme;
