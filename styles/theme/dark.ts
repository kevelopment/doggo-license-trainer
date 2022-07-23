import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bd93f9'
    },
    secondary: {
      main: '#50fa7b'
    },
    text: { primary: '#f8f8f2' },
    background: {
      default: '#282a36',
      paper: '#44475a'
    },
  }
});

export default darkTheme;
