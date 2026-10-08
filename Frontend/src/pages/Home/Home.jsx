import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import OpportunityCard from '../../components/opportunity/OpportunityCard.jsx';
import SearchBar from '../../components/opportunity/SearchBar.jsx';
import DomainFilter from '../../components/opportunity/DomainFilter.jsx';
import { getOpportunities } from '../../api/opportunityApi.js';
import styles from './Home.module.css';

// Home page: lists all opportunities with search and domain filter
function Home() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getOpportunities(search, domain)
      .then((data) => {
        if (!cancelled) {
          setOpportunities(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Failed to load opportunities.');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [search, domain]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box component="main" flexGrow={1}>
        <Container maxWidth="lg" className={styles.container}>
          <Typography variant="h4" component="h1" gutterBottom>
            Internship &amp; Job Listings
          </Typography>

          {/* Search + filter bar */}
          <Stack direction="row" spacing={2} className={styles.filterBar} flexWrap="wrap">
            <SearchBar value={search} onChange={setSearch} />
            <DomainFilter value={domain} onChange={setDomain} />
          </Stack>

          {/* Content area */}
          {loading && <Loader />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && opportunities.length === 0 && (
            <EmptyState message="No opportunities found. Try adjusting your filters." />
          )}
          {!loading && !error && opportunities.length > 0 && (
            <Grid container spacing={3}>
              {opportunities.map((opp) => (
                <Grid item xs={12} sm={6} md={4} key={opp._id}>
                  <OpportunityCard opportunity={opp} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
