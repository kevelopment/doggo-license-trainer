import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: 'aliceblue', paper: '#aaa' },
  },
});
export const darkTheme = createTheme({
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
})
