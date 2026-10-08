import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext.jsx';
import theme from './theme.js';
import AppRoutes from './routes/AppRoutes.jsx';

// App: wraps AuthProvider, MUI ThemeProvider, and routes. BrowserRouter is in main.jsx.
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
