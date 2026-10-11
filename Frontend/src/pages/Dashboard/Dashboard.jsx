import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Hash,
  Search,
  Briefcase,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import styles from './Dashboard.module.css';

const RECENT_KEY = 'rooklet_recent_app_ids';

export default function Dashboard() {
  const navigate = useNavigate();
  const [appId, setAppId] = useState('');
  const [recentIds, setRecentIds] = useState(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // Ignore local storage error
    }
    return [];
  });

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const trimmed = appId.trim();
    if (!trimmed) return;

    // Save to recent list (up to 5 unique IDs)
    try {
      const updated = [trimmed, ...recentIds.filter((id) => id !== trimmed)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      setRecentIds(updated);
    } catch {
      // Ignore storage errors
    }

    navigate(`/applications/${trimmed}`);
  };

  const handleRecentClick = (id) => {
    navigate(`/applications/${id}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glowOrbTop} aria-hidden="true" />
      <div className={styles.glowOrbMid} aria-hidden="true" />
      <Navbar />

      <main className={styles.mainContent}>
        {/* Page Header */}
        <div className={styles.headerSection}>
          <span className={styles.pillBadge}>Candidate Portal</span>
          <h1 className={styles.title}>Applicant Dashboard</h1>
          <p className={styles.subtitle}>
            Monitor your submitted applications, view review progress, and access employer updates in one centralized space.
          </p>
        </div>

        {/* Primary Track Card */}
        <div className={styles.trackCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconWrap}>
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Track Application by ID</h2>
              <p className={styles.cardSubtitle}>
                Enter the unique application code you received upon applying (e.g. APP-X9Y2).
              </p>
            </div>
          </div>

          <form onSubmit={handleTrackSubmit} className={styles.trackForm}>
            <input
              type="text"
              placeholder="Enter Application ID (e.g. APP-7K3F9Q)..."
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className={styles.trackInput}
              required
            />
            <button type="submit" className={styles.trackBtn}>
              <Search className="w-4 h-4" />
              <span>Track Application</span>
            </button>
          </form>

          {/* Recent Applications Chips */}
          {recentIds.length > 0 && (
            <div className={styles.recentSection}>
              <span className={styles.recentTitle}>Recently Checked Application IDs</span>
              <div className={styles.recentChips}>
                {recentIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleRecentClick(id)}
                    className={styles.recentChip}
                    title={`View application ${id}`}
                  >
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{id}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Grid */}
        <div className={styles.dashboardGrid}>
          <div className={styles.infoCard}>
            <div>
              <div className={styles.infoCardHeader}>
                <div className={styles.infoCardIcon}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className={styles.infoCardTitle}>Explore New Roles</h3>
              </div>
              <p className={styles.infoCardText}>
                Discover newly verified internships and kickoff jobs with upfront compensation and direct employer contacts.
              </p>
            </div>
            <Link to="/opportunities" className={styles.actionLink}>
              <span>Browse All Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className={styles.infoCard}>
            <div>
              <div className={styles.infoCardHeader}>
                <div className={styles.infoCardIcon}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className={styles.infoCardTitle}>Verified &amp; Direct</h3>
              </div>
              <p className={styles.infoCardText}>
                Every role is vetted. Never worry about ghost postings, unpaid hidden requirements, or spam recruitment funnels.
              </p>
            </div>
            <Link to="/#features" className={styles.actionLink}>
              <span>Learn About Our Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Timeline Stages Explainer */}
        <div className={styles.stagesCard}>
          <div className={styles.stagesHeader}>
            <h3 className={styles.stagesTitle}>Application Review Milestones</h3>
            <p className={styles.stagesSubtitle}>
              Here is how partner employers process your submissions through Rooklet:
            </p>
          </div>

          <div className={styles.stagesList}>
            <div className={styles.stageItem}>
              <span className={styles.stageNumber}>Stage 01</span>
              <span className={styles.stageName}>Submitted</span>
              <p className={styles.stageDesc}>
                Your details and resume are recorded and immediately visible to the hiring team.
              </p>
            </div>

            <div className={styles.stageItem}>
              <span className={styles.stageNumber}>Stage 02</span>
              <span className={styles.stageName}>Under Review</span>
              <p className={styles.stageDesc}>
                Recruiters review your background, skill alignment, and portfolio deliverables.
              </p>
            </div>

            <div className={styles.stageItem}>
              <span className={styles.stageNumber}>Stage 03</span>
              <span className={styles.stageName}>Shortlisted</span>
              <p className={styles.stageDesc}>
                You passed initial evaluation and are selected for technical rounds or conversations.
              </p>
            </div>

            <div className={styles.stageItem}>
              <span className={styles.stageNumber}>Stage 04</span>
              <span className={styles.stageName}>Contacted</span>
              <p className={styles.stageDesc}>
                Hiring managers connect with you via email or phone for next interview milestones.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
