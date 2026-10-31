import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

function StaticPage({ title, content }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1} sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
            {content}
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default StaticPage;
