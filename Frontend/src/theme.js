import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#4f46e5' },
    background: { default: '#f8f9ff' },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
  },
});

export default theme;
