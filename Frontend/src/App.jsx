import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import theme from './theme.js';
import AppRoutes from './routes/AppRoutes.jsx';

// App: wraps AuthProvider, ToastProvider, MUI ThemeProvider, and routes. BrowserRouter is in main.jsx.
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
