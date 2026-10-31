import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import OpportunityCard from '../../components/opportunity/OpportunityCard.jsx';
import SearchBar from '../../components/opportunity/SearchBar.jsx';
import DomainFilter from '../../components/opportunity/DomainFilter.jsx';
import { getOpportunities } from '../../api/opportunityApi.js';
import styles from './Opportunities.module.css';

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSearchChange = (val) => {
    setSearch(val);
    setLoading(true);
  };

  const handleDomainChange = (val) => {
    setDomain(val);
    setLoading(true);
  };

  useEffect(() => {
    let cancelled = false;

    getOpportunities(search, domain)
      .then((data) => {
        if (!cancelled) {
          setOpportunities(data || []);
          setLoading(false);
          setError('');
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
    <div className={styles.pageWrapper}>
      <div className={styles.glowOrbTop} aria-hidden="true" />
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          <span className={styles.pillBadge}>Verified Roles</span>
          <h1 className={styles.title}>Explore Opportunities</h1>
          <p className={styles.subtitle}>
            Discover verified internships and early-career job openings with transparent stipends, detailed requirements, and direct application links.
          </p>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className={styles.filterContainer}>
          <div className={styles.searchWrapper}>
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>
          <div className={styles.filterWrapper}>
            <DomainFilter value={domain} onChange={handleDomainChange} />
          </div>
        </div>

        {/* Results Metadata */}
        {!loading && !error && (
          <div className={styles.resultsMeta}>
            <span>
              Showing <span className={styles.countHighlight}>{opportunities.length}</span>{' '}
              {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
              {domain ? ` in ${domain}` : ''}
              {search ? ` matching "${search}"` : ''}
            </span>
          </div>
        )}

        {/* Content Area */}
        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && opportunities.length === 0 && (
          <EmptyState
            title="No opportunities found"
            description="No opportunities found matching your criteria. Try adjusting your search or domain filter."
          />
        )}
        {!loading && !error && opportunities.length > 0 && (
          <div className={styles.grid}>
            {opportunities.map((opp) => (
              <OpportunityCard key={opp._id} opportunity={opp} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
